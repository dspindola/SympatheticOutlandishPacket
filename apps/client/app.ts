import { setup } from 'app.setup'

export default (env: {
  port: number
  hostname: string
  development: boolean
}) => setup.get('*', (ctx) => ctx.react.handleRequest(ctx)).listen(env)
