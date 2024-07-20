import React from "react";

export function App({ children }: { children: React.JSX.Element }) {
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
  );
}
