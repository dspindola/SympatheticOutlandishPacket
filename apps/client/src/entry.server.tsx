import type { FileSystemRouter, MatchedRoute } from 'bun'
import type { Context } from 'elysia'
import {
  renderToReadableStream,
  renderToStaticMarkup,
  renderToString,
} from 'react-dom/server'
import { App } from './main'
import type React from 'react'
import { Layout } from './layout'

type Ctx = Context & { router: FileSystemRouter }

export async function handleRequest(ctx: Ctx) {
  const { Route, type } = await match(ctx.path, ctx.router)

  const res = await renderStream(Route, { type })

  return mapResponse(res, 'text/html', type)
}

async function mapResponse(
  res: Response,
  responseType: string,
  moduleType: string
) {
  switch (moduleType) {
    case 'text/javascript;charset=utf-8':
      return res
    case 'text/mdx':
      return res
    case 'text/css;charset=utf-8':
      return new Response(res.body, {
        headers: {
          'Content-Type': 'text/css',
        },
      })
    default:
      return new Response(res.body, {
        headers: {
          'Content-Type': responseType,
        },
      })
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

export async function renderStream(
  Component: () => React.ReactElement,
  { type }: { type: string }
) {
  console.log(type)
  if (type === 'text/css;charset=utf-8') {
    return new Response(renderToStaticMarkup(<Component />), {
      headers: {
        'Content-Type': 'text/css',
      },
    })
  }

  if (type === 'text/mdx') {
    const stream = await renderToReadableStream(
      <Layout>
        <Component />
      </Layout>
    )
    await stream.allReady
    return new Response(stream)
  }

  if (type === 'text/javascript;charset=utf-8') {
    const stream = await renderToReadableStream(
      <Layout>
        <Component />
      </Layout>
    )
    await stream.allReady
    return new Response(stream)
  }

  if (type === 'text/html;charset=utf-8') {
    const stream = renderToStaticMarkup(<Component />)
    return new Response(stream)
  }

  if (type === 'text/css;charset=utf-8') {
    const stream = renderToStaticMarkup(<Component />)
    return new Response(stream)
  }

  throw new Error('not found')
}
