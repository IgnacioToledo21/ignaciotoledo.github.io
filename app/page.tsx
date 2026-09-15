"use client"

import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, Code2, Mail, Menu, MapPin, Phone, X } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

function StarField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let frame = 0

    const stars = Array.from({ length: 160 }, () => ({
      x: 0,
      y: 0,
      size: 0.8,
      base: 0.45,
      cool: false,
      rays: false,
      pulse: 0,
      wait: 0,
    }))

    const place = (star: (typeof stars)[number]) => {
      star.x = Math.random() * width
      star.y = Math.random() * height
      const layer = Math.random()
      if (layer < 0.72) {
        star.size = 0.5 + Math.random() * 0.45
        star.base = 0.22 + Math.random() * 0.28
        star.rays = false
      } else if (layer < 0.93) {
        star.size = 0.85 + Math.random() * 0.45
        star.base = 0.38 + Math.random() * 0.28
        star.rays = Math.random() > 0.55
      } else {
        star.size = 1.15 + Math.random() * 0.4
        star.base = 0.5 + Math.random() * 0.22
        star.rays = true
      }
      star.cool = Math.random() > 0.86
      star.pulse = 0
      star.wait = 40 + Math.random() * 420
    }

    const drawRays = (x: number, y: number, length: number, alpha: number, cool: boolean) => {
      ctx.save()
      ctx.strokeStyle = cool ? `rgba(186, 224, 255, ${alpha})` : `rgba(255, 255, 255, ${alpha})`
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(x, y - length)
      ctx.lineTo(x, y + length)
      ctx.moveTo(x - length, y)
      ctx.lineTo(x + length, y)
      ctx.stroke()
      ctx.restore()
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars.forEach(place)
    }

    resize()

    const draw = () => {
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)

      for (const star of stars) {
        if (!reduce) {
          if (star.pulse > 0) {
            star.pulse -= 0.028
            if (star.pulse < 0) star.pulse = 0
          } else {
            star.wait -= 1
            if (star.wait <= 0) {
              if (Math.random() < 0.22) star.pulse = 1
              star.wait = 90 + Math.random() * 560
            }
          }
        }

        const flash = star.pulse > 0 ? Math.sin(star.pulse * Math.PI) : 0
        const alpha = Math.min(1, star.base + flash * 0.75)
        const color = star.cool ? `rgba(186, 224, 255, ${alpha})` : `rgba(255, 255, 255, ${alpha})`

        if (flash > 0.15) {
          drawRays(star.x, star.y, star.size * (3.2 + flash * 4), flash * 0.7, star.cool)
        } else if (star.rays && star.size > 1) {
          drawRays(star.x, star.y, star.size * 2.1, alpha * 0.28, star.cool)
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * (1 + flash * 0.35), 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={ref} className="particle-field" aria-hidden />
}

function Reveal({ children, className = "", repeat = false }: { children: ReactNode; className?: string; repeat?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible")
        if (!repeat) observer.unobserve(element)
      } else if (repeat) {
        element.classList.remove("is-visible")
      }
    }, { threshold: 0.18 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [repeat])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = ref.current
    if (!timeline) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const update = () => {
      const items = timeline.querySelectorAll<HTMLElement>(".timeline-item")
      if (reduce) {
        timeline.style.setProperty("--timeline-height", `${timeline.offsetHeight}px`)
        items.forEach(item => item.classList.add("is-active"))
        return
      }
      const rect = timeline.getBoundingClientRect()
      const trigger = window.innerHeight * 0.72
      const lineHeight = Math.max(0, Math.min(trigger - rect.top, timeline.offsetHeight))
      timeline.style.setProperty("--timeline-height", `${lineHeight}px`)
      items.forEach(item => {
        if (item.getBoundingClientRect().top < trigger) item.classList.add("is-active")
        else item.classList.remove("is-active")
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return <div ref={ref} className="scroll-timeline">{children}</div>
}

function ProjectBalloon({ onClose }: { onClose: () => void }) {
  return (
    <div className="project-balloon" role="dialog" aria-live="polite" onClick={event => event.stopPropagation()}>
      <p>Si quieres saber de estos proyectos, puedes contactar conmigo abajo.</p>
      <a className="balloon-arrow" href="#contacto" onClick={onClose} aria-label="Ir al apartado de contacto">
        <ArrowDown />
      </a>
    </div>
  )
}

const nav = [["Sobre mí", "sobre-mi"], ["Formación", "formacion"], ["Trayectoria", "trayectoria"], ["Proyectos", "proyectos"], ["Contacto", "contacto"]]
const stack = ["Java", "Kotlin", "Spring Boot", "TypeScript", "Angular", "Next.js", "Python", "SQL", "Git"]
const skills = { Lenguajes: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "PHP", "Kotlin"], Backend: ["Spring Boot", "Node.js", "APIs REST", "Firebase"], Frontend: ["Angular", "Next.js", "HTML/CSS", "JavaFX", "Android"], Datos: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [tip, setTip] = useState<string | null>(null)

  useEffect(() => {
    if (!tip) return
    const close = () => setTip(null)
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      if (target.closest(".project-card.confidential") || target.closest(".project-balloon")) return
      close()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("scroll", close, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("scroll", close)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [tip])

  const toggleTip = (id: string) => setTip(current => current === id ? null : id)

  return <main className="portfolio-shell">
    <StarField />
    <header className="site-header"><div className="section-wrap nav-inner"><a href="#inicio" className="brand"><span className="brand-photo"><img src="/profile/rosmel.jpg" alt="Ignacio Toledo" /></span><strong>Ignacio Toledo</strong></a><nav className="desktop-nav">{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><a className="header-cta" href="#contacto">Hablemos <ArrowUpRight data-icon="inline-end" /></a><button className="menu-btn" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>{menuOpen && <nav className="mobile-nav">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}</header>

    <section id="inicio" className="hero section-wrap"><div className="hero-copy"><p className="kicker"><span className="status-dot" /> Disponible para nuevos retos</p><h1>Construyo lo que<br /><em>imaginas.</em></h1><p className="hero-lead">Soy Rosmel Ignacio Toledo Rangel, desarrollador TI y responsable de tecnología. Transformo problemas reales en productos digitales sólidos, claros y preparados para crecer.</p><div className="hero-actions"><a className="button button-primary" href="#proyectos">Ver proyectos <ArrowUpRight data-icon="inline-end" /></a><a className="text-link" href="#sobre-mi">Conocer mi historia <ArrowDown data-icon="inline-end" /></a></div></div><div className="hero-avatar"><div className="avatar-ring"><img src="/profile/rosmel.jpg" alt="Rosmel Ignacio Toledo Rangel" /></div><p>DESARROLLADOR<br /><b>FULL-STACK</b></p></div></section>

    <div className="marquee-wrap"><div className="marquee">{[...stack, ...stack].map((item, i) => <span key={`${item}-${i}`}>{item} <b>✦</b></span>)}</div></div>

    <section id="sobre-mi" className="about-section"><div className="section-wrap about-grid"><div><Reveal repeat><p className="section-label">01 / Sobre mí</p><h2>La tecnología<br /><span>con intención.</span></h2></Reveal></div><div className="about-content"><Reveal repeat><p className="big-copy">No solo escribo código. Me gusta entender el problema, ordenar el caos y construir soluciones que las personas quieran usar.</p><p className="muted-copy">Soy Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y Responsable TI. Me muevo entre infraestructura, producto y desarrollo para que cada pieza encaje.</p><div className="stat-row"><div><strong>1</strong><span>año y 7 meses<br />de experiencia</span></div><div><strong>∞</strong><span>curiosidad por<br />aprender</span></div><div><strong>24/7</strong><span>mentalidad de<br />resolver</span></div></div></Reveal></div></div></section>

    <section id="formacion" className="path-section"><div className="section-wrap"><div className="path-column"><Reveal repeat><h2 className="path-title">Formación</h2></Reveal><Timeline>
      <article className="timeline-item"><h3>Bachillerato Científico-Tecnológico</h3><span className="date">2019 — 2021</span><p className="place">IES Viera y Clavijo</p><p>Itinerario de ciencias con orientación tecnológica, base para el desarrollo de software y la resolución de problemas técnicos.</p></article>
      <article className="timeline-item"><h3>Técnico Superior en Desarrollo de Aplicaciones Multiplataforma</h3><span className="date">2023 — 2025</span><p className="place">IES Canarias — La Cuesta</p><p>Formación especializada en desarrollo multiplataforma, bases de datos, programación y construcción de soluciones digitales.</p></article>
    </Timeline></div></div></section>

    <section id="trayectoria" className="path-section"><div className="section-wrap"><div className="path-column"><Reveal repeat><h2 className="path-title">Trayectoria</h2></Reveal><Timeline>
      <article className="timeline-item"><h3>Alumno en prácticas · Final de ciclo</h3><span className="date">Abril 2025 — Junio 2025</span><p className="place">Grupo EVM</p><p>Tres meses de prácticas de fin de ciclo. Primer contacto con el entorno tecnológico real: soporte, infraestructura y el día a día del equipo de TI.</p></article>
      <article className="timeline-item"><h3>Becario</h3><span className="date">Julio 2025 — Diciembre 2025</span><p className="place">Grupo EVM</p><p>Seis meses como becario, profundizando en operaciones TI, desarrollo de módulos para intranet y administración de herramientas internas.</p></article>
      <article className="timeline-item"><h3>Responsable TI · Operaciones TI</h3><span className="date">Enero 2026 — Actualidad</span><p className="place">Grupo EVM</p><p>Contratación como empleado. Estabilidad y evolución del entorno tecnológico, soporte técnico, inventario y administración de WordPress y Moodle.</p></article>
    </Timeline></div></div></section>

    <section className="stack-section"><div className="section-wrap"><Reveal repeat><div className="stack-intro"><p className="section-label">04 / Stack</p><h2>Herramientas<br /><span>para hacer.</span></h2></div></Reveal><div className="stack-cards">{Object.entries(skills).map(([title, items], i) => <div className="stack-card" key={title}><span className="card-number">0{i + 1}</span><Code2 /><h3>{title}</h3><div className="tag-row">{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></div></section>

    <section id="proyectos" className="projects-section"><div className="section-wrap"><Reveal repeat><div className="projects-heading"><p className="section-label">05 / Proyectos</p><h2>Ideas que toman<br /><span>forma.</span></h2></div></Reveal><div className="project-grid">
      <a className="project-card featured" href="https://github.com/IgnacioToledo21/EspaciosInvasores" target="_blank" rel="noreferrer"><div className="project-art space-art" role="img" aria-label="Espacios Invasores" /><div className="project-info"><div><p>01 / PROYECTO PERSONAL</p><h3>Espacios Invasores</h3></div><ArrowUpRight /></div><p>Versión propia del clásico Space Invaders, desarrollada con Java y JavaFX como proyecto de aprendizaje.</p><div className="project-tags"><span>Java</span><span>JavaFX</span><span>GitHub</span></div></a>
      <a className="project-card" href="https://github.com/IgnacioToledo21/MustangSelector_PGL" target="_blank" rel="noreferrer"><div className="project-art logo-art mustang-art"><img src="/projects/mustang-selector.png" alt="Mustang Selector" /></div><div className="project-info"><div><p>02 / PROYECTO PERSONAL</p><h3>Mustang Selector</h3></div><ArrowUpRight /></div><p>App Android de comercio de coches, desarrollada en Kotlin como proyecto final de Android.</p><div className="project-tags"><span>Kotlin</span><span>Android</span><span>GitHub</span></div></a>
      <article className={`project-card confidential${tip === "tabsmart" ? " is-open" : ""}`} tabIndex={0} role="button" aria-expanded={tip === "tabsmart"} onClick={() => toggleTip("tabsmart")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleTip("tabsmart") } }}>
        <div className="project-art logo-art tabsmart-art"><img src="/projects/tabsmart.jpg" alt="TabSmart" /></div>
        <div className="project-info"><div><p>03 / PROYECTO PERSONAL</p><h3>TabSmart</h3></div><BriefcaseBusiness /></div>
        <p>Gestión inteligente de pestañas, publicada en Google y preparada para monetizar. El código no es público.</p>
        <div className="project-tags"><span>Confidencial</span><span>Producto</span><span>Google</span></div>
        {tip === "tabsmart" && <ProjectBalloon onClose={() => setTip(null)} />}
      </article>
      <article className={`project-card confidential${tip === "elevate" ? " is-open" : ""}`} tabIndex={0} role="button" aria-expanded={tip === "elevate"} onClick={() => toggleTip("elevate")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleTip("elevate") } }}>
        <div className="project-art logo-art elevate-art"><img src="/projects/elevatex.png" alt="ElevateX" /></div>
        <div className="project-info"><div><p>04 / PROYECTO CORPORATIVO</p><h3>ElevateX</h3></div><BriefcaseBusiness /></div>
        <p>Desarrollo de módulos para intranet y participación en el lanzamiento de productos digitales comerciales.</p>
        <div className="project-tags"><span>Confidencial</span><span>Intranet</span></div>
        {tip === "elevate" && <ProjectBalloon onClose={() => setTip(null)} />}
      </article>
      <article className={`project-card confidential${tip === "crm" ? " is-open" : ""}`} tabIndex={0} role="button" aria-expanded={tip === "crm"} onClick={() => toggleTip("crm")} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleTip("crm") } }}>
        <div className="project-art logo-art evm-art"><img src="/projects/crm-evm.png" alt="Grupo EVM" /></div>
        <div className="project-info"><div><p>05 / PROYECTO CORPORATIVO</p><h3>CRM empresarial</h3></div><BriefcaseBusiness /></div>
        <p>CRM interno de Grupo EVM, vinculado con ElevateX para conectar producto, clientes y operación en un mismo flujo.</p>
        <div className="project-tags"><span>Confidencial</span><span>CRM</span><span>ElevateX</span></div>
        {tip === "crm" && <ProjectBalloon onClose={() => setTip(null)} />}
      </article>
    </div></div></section>

    <section id="contacto" className="contact-section"><div className="section-wrap contact-grid"><div><Reveal repeat><p className="section-label">06 / Contacto</p><h2>Hagamos algo<br /><span>increíble.</span></h2><p className="muted-copy">¿Tienes una idea, un reto o simplemente quieres hablar de tecnología? Mi bandeja está abierta.</p></Reveal><div className="contact-links"><a href="mailto:ignaciosurf124@gmail.com"><Mail /> ignaciosurf124@gmail.com</a><a href="mailto:ignacioworkspace@gmail.com"><Mail /> ignacioworkspace@gmail.com</a><a href="tel:+34637029722"><Phone /> +34 637 029 722</a><span><MapPin /> Santa Cruz de Tenerife</span></div></div><form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}><label>Tu nombre<input name="name" required placeholder="¿Cómo te llamas?" /></label><label>Tu email<input name="email" required type="email" placeholder="tu@email.com" /></label><label>Mensaje<textarea name="message" required rows={4} placeholder="Cuéntame sobre tu proyecto..." /></label><button className="button button-primary" type="submit">{sent ? <><Check data-icon="inline-start" /> Mensaje preparado</> : <>Enviar mensaje <ArrowUpRight data-icon="inline-end" /></>}</button></form></div></section>
    <footer className="footer section-wrap">
      <span>© 2026 Rosmel Ignacio Toledo Rangel</span>
      <nav className="footer-social" aria-label="Redes">
        <a href="https://www.linkedin.com/in/itr28/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" /></svg>
        </a>
        <a href="https://github.com/IgnacioToledo21" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3A12 12 0 0 0 8.2 23.7c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" /></svg>
        </a>
      </nav>
    </footer>
  </main>
}
