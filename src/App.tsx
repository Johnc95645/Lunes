import { useState } from 'react'
import './App.css'

type Estado = 'Aprobada' | 'Propuesta'

const capacidades: { nombre: string; estado: Estado }[] = [
{ nombre: 'Centinela', estado: 'Aprobada' },
{ nombre: 'Investigadora Permanente', estado: 'Aprobada' },
{ nombre: 'Memoria Autobiográfica', estado: 'Aprobada' },
{ nombre: 'Estratega', estado: 'Aprobada' },
{ nombre: 'Laboratorio de Ideas', estado: 'Aprobada' },
{ nombre: 'Entorno', estado: 'Propuesta' },
{ nombre: 'Supervivencia', estado: 'Propuesta' },
{ nombre: 'Anticipación', estado: 'Propuesta' },
]

// Contenido de ejemplo: muestra cómo se verá el panel. No es actividad real.
const actividadEjemplo = [
{ tipo: 'Oportunidad', texto: 'Aquí aparecerán las oportunidades que Lunes detecte.' },
{ tipo: 'Alerta', texto: 'Las alertas relevantes se ordenarán por prioridad.' },
{ tipo: 'Seguimiento', texto: 'Los seguimientos pendientes quedarán a un clic.' },
]

type Mensaje = { id: number; de: 'tu' | 'sistema'; texto: string }

export default function App() {
const [mensajes, setMensajes] = useState<Mensaje[]>([])
const [texto, setTexto] = useState('')

function enviar(e: React.FormEvent) {
e.preventDefault()
const limpio = texto.trim()
if (!limpio) return
const id = Date.now()
setMensajes((m) => [
...m,
{ id, de: 'tu', texto: limpio },
{
id: id + 1,
de: 'sistema',
texto: 'Lunes todavía no está conectada a su inteligencia central. Tu mensaje solo se muestra en esta pantalla.',
},
])
setTexto('')
}

return (
<div className="app">
<header className="cabecera">
<h1 className="marca">Lunes</h1>
<p className="lema">Ayudar a descubrir aquello que todavía no hemos considerado.</p>
</header>

<main className="espacio">
<aside className="panel" aria-label="Proyectos y capacidades">
<h2>Proyectos</h2>
<ul className="lista">
<li>
<strong>Lunes</strong>
<span>Primera interfaz visual, en desarrollo</span>
</li>
</ul>

<h2>Capacidades</h2>
<ul className="lista">
{capacidades.map((c) => (
<li key={c.nombre}>
<strong>{c.nombre}</strong>
<span className={c.estado === 'Aprobada' ? 'etiqueta ok' : 'etiqueta'}>
{c.estado} · sin implementar
</span>
</li>
))}
</ul>
</aside>

<section className="centro" aria-label="Conversación con Lunes">
{/* Presencia provisional: el símbolo definitivo lo proporcionará John. */}
<div className="presencia" role="img" aria-label="Presencia de Lunes" />

<div className="conversacion" aria-live="polite">
{mensajes.length === 0 ? (
<p className="vacio">Escribe un mensaje para empezar.</p>
) : (
mensajes.map((m) => (
<p key={m.id} className={m.de === 'tu' ? 'msg tu' : 'msg sistema'}>
{m.texto}
</p>
))
)}
</div>

<form className="entrada" onSubmit={enviar}>
<input
value={texto}
onChange={(e) => setTexto(e.target.value)}
placeholder="Escríbele a Lunes"
aria-label="Mensaje para Lunes"
/>
<button type="button" className="voz" disabled title="La voz se integrará más adelante">
Voz
</button>
<button type="submit">Enviar</button>
</form>
</section>

<aside className="panel" aria-label="Centro de actividad">
<h2>Centro de actividad</h2>
<ul className="lista">
{actividadEjemplo.map((a) => (
<li key={a.tipo}>
<strong>{a.tipo}</strong>
<span>{a.texto}</span>
<span className="etiqueta">Ejemplo</span>
</li>
))}
</ul>
</aside>
</main>
</div>
)
}
