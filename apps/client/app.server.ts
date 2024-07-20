import App from 'app'

const app = App({
  port: Number(process.env.PORT ?? 3000),
  hostname: process.env.HOSTNAME ?? 'localhost',
  development: process.env.DEV === 'true',
})

console.log(`Server running at ${app.server?.url}`)
