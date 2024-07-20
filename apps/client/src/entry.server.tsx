import type { FileSystemRouter, MatchedRoute } from 'bun'
import type { Context } from 'elysia'
import { renderToReadableStream, renderToStaticMarkup } from 'react-dom/server'
import type React from 'react'
import { Layout } from './layout'

type Ctx = Context & { router: FileSystemRouter }

export async function handleRequest(ctx: Ctx) {
  const { Route, type } = await match(ctx.path, ctx.router)

  const res = await render(Route, { type })

  return mapResponse(res, type)
}

async function mapResponse(res: Response, moduleType: string) {
  switch (moduleType) {
    case 'text/javascript;charset=utf-8':
    case 'text/mdx':
    case 'text/css;charset=utf-8':
    case 'text/html;charset=utf-8':
    default:
      return res
  }
}

export async function match(path: string, router: FileSystemRouter) {
  try {
    const { filePath } = router.match(path) as MatchedRoute
    const { type } = Bun.file(filePath)

    const module = await import(filePath)

    if (type === 'text/mdx') {
      return {
        Route: module.default,
        type,
      } as {
        Route: () => React.JSX.Element
        type: string
      }
    }

    if (type === 'text/javascript;charset=utf-8') {
      return {
        Route: () => <module.Route />,
        type,
      } as {
        Route: () => React.JSX.Element
        type: string
      }
    }

    if (type === 'text/css;charset=utf-8') {
      return { Route: () => module.default, type } as {
        Route: () => React.JSX.Element
        type: string
      }
    }

    if (type === 'text/html;charset=utf-8') {
      return {
        Route: () => (
          <html dangerouslySetInnerHTML={{ __html: module.default }} />
        ),
        type,
      } as {
        Route: () => React.JSX.Element
        type: string
      }
    }

    return { Route: module.Route, type }
  } catch (error) {
    throw new Error('error')
  }
}

export async function render(
  Component: () => React.ReactElement,
  { type }: { type: string }
) {
  if (type === 'text/mdx') {
    return await renderMdx(Component)
  }

  if (type === 'text/javascript;charset=utf-8') {
    return await renderJs(Component)
  }

  if (type === 'text/html;charset=utf-8') {
    return await renderHtml(Component)
  }

  if (type === 'text/css;charset=utf-8') {
    return await renderCss(Component)
  }

  throw new Error('not found')
}

export async function renderHtml(Component: () => React.ReactElement) {
  const html = renderToStaticMarkup(
    <Layout>
      <Component />
    </Layout>
  )
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export async function renderCss(Component: () => React.ReactElement) {
  const css = renderToStaticMarkup(<Component />)
  return new Response(css, {
    headers: {
      'Content-Type': 'text/css',
    },
  })
}

export async function renderJs(Component: () => React.ReactElement) {
  const stream = await renderToReadableStream(
    <Layout>
      <Component />
    </Layout>
  )
  await stream.allReady
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export async function renderMdx(Component: () => React.ReactElement) {
  const stream = await renderToReadableStream(
    <Layout>
      <Component />
    </Layout>
  )
  await stream.allReady
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
