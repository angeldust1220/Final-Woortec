export const metadata = {
  title: 'Woortec',
  description: 'at Woortec, we organize the advertising investment process, with our integrated platform designed to simplify ad management, providing you with a centralized hub for all your campaigns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
