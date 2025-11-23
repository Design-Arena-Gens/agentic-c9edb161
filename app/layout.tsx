import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Buscador de Noticias IA en Deportes',
  description: 'Automatización de búsqueda de noticias sobre IA en el deporte',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
