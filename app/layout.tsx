import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rosmel Ignacio Toledo Rangel | Responsable TI & Full-Stack",
  description: "Portfolio de Rosmel Ignacio Toledo Rangel, Responsable TI y desarrollador full-stack en Santa Cruz de Tenerife.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
