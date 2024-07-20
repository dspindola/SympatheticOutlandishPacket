import { Elysia, } from "elysia"
import { cors } from "@elysiajs/cors"
import { staticPlugin } from "@elysiajs/static"
import { handleRequest, renderStream, match } from "$/server/entry"
import { createRouter, Router } from "$/app/router"

export const setup = new Elysia()
	.use(cors())
	.use(staticPlugin({
		prefix: "/",
		alwaysStatic: false,
		noCache: true
	}))
	.decorate("router", createRouter({ dir: "src/routes", origin: "https://0c0edc0c-bcd9-4d70-af40-58b65870a635-00-169g3jjjlsqjq.worf.replit.dev/" }))
	.decorate('react', { handleRequest, renderStream, match })

