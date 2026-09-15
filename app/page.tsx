"use client"

import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, Code2, GitBranch, Mail, Menu, MapPin, Phone, Sparkles, X } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible")
        observer.unobserve(element)
      }
    }, { threshold: 0.14 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const nav = [["Formación", "formacion"], ["Sobre mí", "sobre-mi"], ["Experiencia", "experiencia"], ["Proyectos", "proyectos"], ["Contacto", "contacto"]]
const stack = ["Java", "Spring Boot", "TypeScript", "Angular", "Next.js", "Python", "SQL", "Git"]
const skills = { Lenguajes: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "PHP", "Kotlin"], Backend: ["Spring Boot", "Node.js", "APIs REST", "Firebase"], Frontend: ["Angular", "Next.js", "HTML/CSS", "JavaFX"], Datos: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  return <main className="portfolio-shell">
    <header className="site-header"><div className="section-wrap nav-inner"><a href="#inicio" className="brand"><span>RT</span><strong>Rosmel Toledo</strong></a><nav className="desktop-nav">{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><a className="header-cta" href="#contacto">Hablemos <ArrowUpRight data-icon="inline-end" /></a><button className="menu-btn" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>{menuOpen && <nav className="mobile-nav">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}</header>

    <section id="inicio" className="hero section-wrap"><div className="hero-grid" /><div className="constellation"><i /><i /><i /><i /><i /><span /></div><div className="hero-copy"><p className="kicker"><span className="status-dot" /> Disponible para nuevos retos</p><h1>Construyo lo que<br /><em>imaginas.</em></h1><p className="hero-lead">Soy Rosmel, desarrollador TI y responsable de tecnología. Transformo problemas reales en productos digitales sólidos, claros y preparados para crecer.</p><div className="hero-actions"><a className="button button-primary" href="#proyectos">Ver proyectos <ArrowUpRight data-icon="inline-end" /></a><a className="text-link" href="#sobre-mi">Conocer mi historia <ArrowDown data-icon="inline-end" /></a></div></div><div className="hero-avatar"><div className="avatar-ring"><span>RT</span></div><p>DESARROLLADOR<br /><b>FULL-STACK</b></p></div><div className="hero-bottom"><span>01 — 05</span><div className="scroll-line" /><span>SCROLL TO EXPLORE</span></div></section>

    <div className="marquee-wrap"><div className="marquee">{[...stack, ...stack].map((item, i) => <span key={`${item}-${i}`}>{item} <b>✦</b></span>)}</div></div>

    <section id="formacion" className="light-section formation-section"><div className="section-wrap"><Reveal><p className="section-label cyan">01 / Formación</p><div className="formation-heading"><h2>La base para<br /><span>seguir creciendo.</span></h2><p>Una formación práctica que conecta desarrollo, datos y producto para construir soluciones completas.</p></div></Reveal><div className="formation-card"><Reveal><p className="date">2022 — 2024</p><h3>Técnico Superior en Desarrollo de Aplicaciones Multiplataforma</h3><h4>IES Canarias — La Cuesta</h4><p>Formación especializada en desarrollo multiplataforma, bases de datos, programación y construcción de soluciones digitales.</p><div className="tag-row"><span>Java</span><span>Bases de datos</span><span>Multiplataforma</span></div></Reveal></div></div></section>

    <section id="sobre-mi" className="dark-section about-section"><div className="section-wrap about-grid"><div><Reveal><p className="section-label">02 / Sobre mí</p><h2>La tecnología<br /><span>con intención.</span></h2></Reveal></div><div className="about-content"><p className="big-copy">No solo escribo código. Me gusta entender el problema, ordenar el caos y construir soluciones que las personas quieran usar.</p><p className="muted-copy">Soy Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y Responsable TI. Me muevo entre infraestructura, producto y desarrollo para que cada pieza encaje.</p><div className="stat-row"><div><strong>+3</strong><span>años explorando<br />tecnología</span></div><div><strong>∞</strong><span>curiosidad por<br />aprender</span></div><div><strong>24/7</strong><span>mentalidad de<br />resolver</span></div></div></div></div></section>

    <section id="experiencia" className="light-section"><div className="section-wrap"><p className="section-label cyan">02 / Trayectoria</p><div className="experience-grid"><h2>Experiencia que<br /><span>deja huella.</span></h2><div className="timeline"><article><span className="timeline-dot" /><p className="date">MARZO 2025 — ACTUALIDAD</p><h3>Responsable TI · Operaciones TI</h3><h4>Grupo EVM</h4><p>Estabilidad y evolución del entorno tecnológico. Desarrollo de módulos para intranet, soporte técnico, inventario y administración de WordPress y Moodle.</p><div className="tag-row"><span>Infraestructura</span><span>Intranet</span><span>Soporte</span></div></article></div></div></div></section>

    <section className="dark-section stack-section"><div className="section-wrap"><div className="stack-intro"><p className="section-label">03 / Stack</p><h2>Herramientas<br /><span>para hacer.</span></h2><p>Una caja de herramientas en constante evolución, elegida para resolver cada reto con criterio.</p></div><div className="stack-cards">{Object.entries(skills).map(([title, items], i) => <div className="stack-card" key={title}><span className="card-number">0{i + 1}</span><Code2 /><h3>{title}</h3><div className="tag-row">{items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></div></section>

    <section id="proyectos" className="projects-section"><div className="section-wrap"><div className="projects-heading"><div><p className="section-label cyan">04 / Proyectos</p><h2>Ideas que toman<br /><span>forma.</span></h2></div><p>Proyectos personales y profesionales que cuentan cómo pienso, diseño y construyo.</p></div><div className="project-grid"><a className="project-card featured" href="https://github.com/IgnacioToledo21/EspaciosInvasores" target="_blank" rel="noreferrer"><div className="project-art space-art"><span>INVADERS</span><div className="pixel-ship">◆</div></div><div className="project-info"><div><p>01 / PROYECTO PERSONAL</p><h3>Espacios Invasores</h3></div><ArrowUpRight /></div><p>Versión propia del clásico Space Invaders, desarrollada con Java y JavaFX como proyecto de aprendizaje.</p><div className="project-tags"><span>Java</span><span>JavaFX</span><span>GitHub</span></div></a><div className="project-card confidential"><div className="project-art elevate-art"><Sparkles /><span>ELEVATEX</span></div><div className="project-info"><div><p>02 / PROYECTO CORPORATIVO</p><h3>ElevateX</h3></div><BriefcaseBusiness /></div><p>Desarrollo de módulos para intranet y participación en el lanzamiento de productos digitales comerciales.</p><div className="project-tags"><span>Confidencial</span><span>Intranet</span></div></div></div></div></section>

    <section id="contacto" className="contact-section"><div className="section-wrap contact-grid"><div><p className="section-label">05 / Contacto</p><h2>Hagamos algo<br /><span>increíble.</span></h2><p className="muted-copy">¿Tienes una idea, un reto o simplemente quieres hablar de tecnología? Mi bandeja está abierta.</p><div className="contact-links"><a href="mailto:ignacioworkspace@gmail.com"><Mail /> ignacioworkspace@gmail.com</a><a href="tel:+34637029722"><Phone /> +34 637 029 722</a><span><MapPin /> Santa Cruz de Tenerife</span></div></div><form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}><label>Tu nombre<input name="name" required placeholder="¿Cómo te llamas?" /></label><label>Tu email<input name="email" required type="email" placeholder="tu@email.com" /></label><label>Mensaje<textarea name="message" required rows={4} placeholder="Cuéntame sobre tu proyecto..." /></label><button className="button button-primary" type="submit">{sent ? <><Check data-icon="inline-start" /> Mensaje preparado</> : <>Enviar mensaje <ArrowUpRight data-icon="inline-end" /></>}</button></form></div></section>
    <footer className="footer section-wrap"><span>© 2025 Rosmel Ignacio Toledo Rangel</span><a href="https://github.com/IgnacioToledo21" target="_blank" rel="noreferrer"><GitBranch /> GitHub</a></footer>
  </main>
}
