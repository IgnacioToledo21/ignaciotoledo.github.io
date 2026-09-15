"use client"

import { ArrowUpRight, Check, Code2, GitBranch, Globe2, Mail, MapPin, Menu, Phone, X } from "lucide-react"
import { useState } from "react"

const skills = {
  Lenguajes: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "PHP", "Kotlin", "HTML/CSS"],
  "Bases de datos": ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Firebase", "Room"],
  Frameworks: ["Spring Boot", "Angular", "Next.js", "JavaFX", "Android"],
  "Herramientas & ERP": ["Git", "GitHub", "Vercel", "Odoo"],
}

const nav = [["Sobre mí", "sobre-mi"], ["Experiencia", "experiencia"], ["Proyectos", "proyectos"], ["Contacto", "contacto"]]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  return (
    <main className="portfolio-shell">
      <header className="sticky top-0 z-50 border-b border-[#e7f0f4] bg-white/90 backdrop-blur-md">
        <div className="section-wrap flex h-[72px] items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3 font-bold tracking-tight"><span className="flex size-9 items-center justify-center rounded-full bg-[#10253e] text-sm text-white">RT</span><span>Rosmel Toledo<span className="text-cyan-500">.</span></span></a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#60748b] md:flex">
            {nav.map(([label, id]) => <a key={id} href={`#${id}`} className="transition-colors hover:text-cyan-600">{label}</a>)}
          </nav>
          <a href="mailto:ignacioworkspace@gmail.com" className="hidden rounded-full bg-[#10253e] px-5 py-3 text-xs font-bold text-white transition-transform hover:-translate-y-0.5 md:block">Hablemos <ArrowUpRight className="ml-1 inline size-4" /></a>
          <button className="md:hidden" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="section-wrap flex flex-col gap-4 pb-5 text-sm font-semibold md:hidden">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <section id="inicio" className="relative grid-bg">
        <div className="hero-orb" />
        <div className="section-wrap relative flex min-h-[calc(100vh-72px)] flex-col justify-center py-24">
          <div className="max-w-4xl">
            <p className="eyebrow fade-up">Responsable TI · Desarrollador full-stack</p>
            <h1 className="display mt-7 fade-up delay-1">Tecnología que<br /><span className="text-cyan-500">mueve ideas.</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#60748b] fade-up delay-2">Construyo productos digitales estables, eficientes y preparados para evolucionar. Desde la infraestructura hasta la experiencia final.</p>
            <div className="mt-10 flex flex-wrap items-center gap-4 fade-up delay-3"><a href="#proyectos" className="rounded-full bg-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-1 hover:bg-cyan-600">Ver proyectos <ArrowUpRight className="ml-2 inline size-4" /></a><a href="#sobre-mi" className="rounded-full border border-[#cfe1e9] px-6 py-4 text-sm font-bold transition-colors hover:border-cyan-400 hover:text-cyan-600">Conocerme mejor</a></div>
          </div>
          <div className="mt-24 flex items-center gap-8 text-xs font-bold uppercase tracking-[.16em] text-[#8aa0b2] fade-up delay-4"><span>Santa Cruz de Tenerife</span><span className="h-px w-16 bg-cyan-300" /><span>Disponible para nuevos retos</span></div>
        </div>
      </section>

      <section id="sobre-mi" className="section-wrap grid gap-12 py-28 md:grid-cols-[.8fr_1.2fr] md:py-36">
        <div><p className="eyebrow">01 / Sobre mí</p><h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Un perfil técnico con visión de producto.</h2></div>
        <div><p className="text-xl leading-9 text-[#60748b]">Soy Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y Responsable TI. Me muevo entre el código, los sistemas y las personas para convertir necesidades reales en soluciones que funcionan.</p><p className="mt-6 leading-8 text-[#60748b]">He participado en productos comerciales, módulos para intranets y proyectos estratégicos desde su fase inicial. Me importan tanto la calidad técnica como que cada entrega tenga un impacto claro en el negocio.</p><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"><Info label="Experiencia" value="TI + Dev" /><Info label="Enfoque" value="Full-stack" /><Info label="Ubicación" value="Tenerife" /><Info label="Estado" value="Disponible" /></div></div>
      </section>

      <section id="experiencia" className="bg-[#f6fbfd] py-28"><div className="section-wrap"><p className="eyebrow">02 / Trayectoria</p><div className="mt-12 grid gap-14 md:grid-cols-[.7fr_1.3fr]"><div><h2 className="text-4xl font-bold tracking-tight md:text-5xl">Experiencia que<br /><span className="text-cyan-500">suma capas.</span></h2></div><div className="relative border-l border-cyan-200 pl-8"><Timeline title="Responsable TI · Operaciones TI" company="Grupo EVM" date="Marzo 2025 — Actualidad"><p>Garantizo la estabilidad y evolución del entorno tecnológico, alineando infraestructura y desarrollo con los objetivos de negocio.</p><p>Desarrollo de módulos para intranet, soporte técnico, gestión de inventario y administración de WordPress y Moodle. Participación en el lanzamiento de productos digitales comerciales.</p></Timeline><Timeline title="Desarrollo de Aplicaciones Multiplataforma" company="IES Canarias — La Cuesta" date="Formación"><p>Formación especializada en desarrollo multiplataforma, bases de datos y construcción de soluciones digitales.</p></Timeline></div></div></div></section>

      <section className="section-wrap py-28"><div className="grid gap-12 md:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow">03 / Stack</p><h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Las herramientas detrás de cada solución.</h2></div><div className="grid gap-4 sm:grid-cols-2">{Object.entries(skills).map(([title, items]) => <div className="card p-6" key={title}><Code2 className="size-5 text-cyan-500" /><h3 className="mt-5 font-bold">{title}</h3><div className="mt-4 flex flex-wrap gap-2">{items.map(item => <span key={item} className="rounded-full bg-[#eef9fc] px-3 py-1.5 text-xs font-semibold text-[#376579]">{item}</span>)}</div></div>)}</div></div></section>

      <section id="proyectos" className="bg-[#10253e] py-28 text-white"><div className="section-wrap"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow text-cyan-300">04 / Proyectos</p><h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Ideas convertidas<br />en producto.</h2></div><p className="max-w-xs text-sm leading-7 text-slate-300">Una selección de proyectos que refleja mi forma de trabajar: aprender haciendo y construir con intención.</p></div><div className="mt-14 grid gap-5 md:grid-cols-2"><Project title="Espacios Invasores" type="Juego · Java + JavaFX" description="Una versión propia del clásico Space Invaders desarrollada como proyecto de aprendizaje y experimentación." href="https://github.com/IgnacioToledo21/EspaciosInvasores" /><Project title="ElevateX" type="Proyecto corporativo · Confidencial" description="Desarrollo de módulos para intranet y participación en el lanzamiento de productos digitales comerciales. Información bajo confidencialidad." private /></div></div></section>

      <section className="section-wrap grid gap-12 py-28 md:grid-cols-2"><div><p className="eyebrow">05 / Más sobre mí</p><h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">La parte humana<br />también importa.</h2></div><div className="grid gap-4 sm:grid-cols-2"><Mini title="Habilidades" items={["Resolución de conflictos", "Trabajo en equipo", "Gestión del tiempo", "Aprendizaje rápido"]} /><Mini title="Idiomas" items={["Español · Nativo", "Inglés · Intermedio"]} /><Mini title="Disponibilidad" items={["Jornada completa", "Viajes disponibles"]} /><Mini title="Personal" items={["Carnet de conducir", "Coche propio"]} /></div></section>

      <section id="contacto" className="bg-[#e9faff] py-28"><div className="section-wrap grid gap-12 md:grid-cols-[.9fr_1.1fr]"><div><p className="eyebrow">06 / Contacto</p><h2 className="mt-5 text-5xl font-bold tracking-tight md:text-6xl">¿Hacemos algo<br /><span className="text-cyan-500">que importe?</span></h2><p className="mt-6 max-w-sm leading-7 text-[#60748b]">Estoy abierto a conversar sobre proyectos, oportunidades y retos tecnológicos.</p><div className="mt-10 flex flex-col gap-4 text-sm font-semibold"><a href="mailto:ignacioworkspace@gmail.com" className="flex items-center gap-3 hover:text-cyan-600"><Mail className="size-4 text-cyan-500" />ignacioworkspace@gmail.com</a><a href="tel:+34637029722" className="flex items-center gap-3 hover:text-cyan-600"><Phone className="size-4 text-cyan-500" />+34 637 029 722</a><span className="flex items-center gap-3"><MapPin className="size-4 text-cyan-500" />Santa Cruz de Tenerife</span></div></div><form className="card bg-white p-7 md:p-9" onSubmit={(e) => { e.preventDefault(); setSent(true) }}><div className="grid gap-5"><label className="text-sm font-bold">Nombre<input required name="name" className="mt-2 w-full rounded-xl border border-[#dceaf2] px-4 py-3 font-normal outline-none transition focus:border-cyan-400" placeholder="Tu nombre" /></label><label className="text-sm font-bold">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-[#dceaf2] px-4 py-3 font-normal outline-none transition focus:border-cyan-400" placeholder="tu@email.com" /></label><label className="text-sm font-bold">Mensaje<textarea required name="message" rows={4} className="mt-2 w-full resize-none rounded-xl border border-[#dceaf2] px-4 py-3 font-normal outline-none transition focus:border-cyan-400" placeholder="Cuéntame sobre tu idea..." /></label><button className="rounded-full bg-[#10253e] px-6 py-4 text-sm font-bold text-white transition hover:bg-cyan-600" type="submit">{sent ? <><Check className="mr-2 inline size-4" />Mensaje preparado</> : <>Enviar mensaje <ArrowUpRight className="ml-2 inline size-4" /></>}</button>{sent && <p className="text-xs text-[#60748b]">Gracias. Para completar el envío, escríbeme directamente por email.</p>}</div></form></div></section>

      <footer className="section-wrap flex flex-col gap-5 py-8 text-xs font-semibold text-[#60748b] sm:flex-row sm:items-center sm:justify-between"><span>© 2025 Rosmel Ignacio Toledo Rangel</span><div className="flex gap-5"><a href="https://github.com/IgnacioToledo21" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-600"><GitBranch className="size-4" /> GitHub</a><a href="mailto:ignacioworkspace@gmail.com" className="flex items-center gap-2 hover:text-cyan-600"><Globe2 className="size-4" /> Contacto</a></div></footer>
    </main>
  )
}

function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-xs font-bold uppercase tracking-wider text-[#8aa0b2]">{label}</p><p className="mt-2 font-bold">{value}</p></div> }
function Timeline({ title, company, date, children }: { title: string; company: string; date: string; children: React.ReactNode }) { return <article className="relative mb-14 last:mb-0"><span className="absolute -left-[39px] top-1 size-3 rounded-full border-4 border-[#f6fbfd] bg-cyan-500" /><p className="text-xs font-bold uppercase tracking-wider text-cyan-600">{date}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-1 font-semibold text-[#60748b]">{company}</p><div className="mt-5 grid gap-3 leading-7 text-[#60748b]">{children}</div></article> }
function Project({ title, type, description, href, private: isPrivate }: { title: string; type: string; description: string; href?: string; private?: boolean }) { const content = <div className="card group flex min-h-[260px] flex-col justify-between border-slate-700 bg-white/5 p-7 hover:border-cyan-400 hover:bg-white/10"><div><div className="flex items-start justify-between"><span className="text-xs font-bold uppercase tracking-wider text-cyan-300">{type}</span>{isPrivate ? <span className="rounded-full border border-slate-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">Privado</span> : <ArrowUpRight className="size-5 text-cyan-300 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}</div><h3 className="mt-12 text-3xl font-bold">{title}</h3><p className="mt-4 max-w-md leading-7 text-slate-300">{description}</p></div>{!isPrivate && <span className="mt-6 text-sm font-bold text-cyan-300">Ver en GitHub →</span>}</div>; return href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content }
function Mini({ title, items }: { title: string; items: string[] }) { return <div className="card p-6"><h3 className="font-bold">{title}</h3><ul className="mt-4 grid gap-2 text-sm leading-6 text-[#60748b]">{items.map(item => <li key={item}>— {item}</li>)}</ul></div> }
