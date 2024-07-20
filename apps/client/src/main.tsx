import React from 'react'
import { preloadModule } from 'react-dom'

export function App({ children }: { children: React.JSX.Element }) {
  preloadModule('/t', {
    as: 'style',
  })
  return (
    <html lang="en">
      <head>
        <title>app</title>
        <link
          rel="shortcut icon"
          href="/_static/favicon.svg"
          type="image/svg+xml"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
