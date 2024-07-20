import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import { handleRequest } from '$/server/entry'
import { createRouter } from '$/app/router'

const origin = process.env.REPLIT_DEV_DOMAIN
  ? `https://${process.env.REPLIT_DEV_DOMAIN}`
  : 'http://localhost:3000'

export const setup = new Elysia()
  .use(cors())
  .use(
    staticPlugin({
      prefix: '/_static',
      directive: 'public',
      alwaysStatic: false,
      noCache: true,
    })
  )
  .decorate(
    'router',
    createRouter({
      dir: 'src/routes',
      origin,
      assetPrefix: '/_static/',
    })
  )
  .decorate('react', { handleRequest })
