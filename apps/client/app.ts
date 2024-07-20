import { setup } from "$/app/setup"

export default () =>
	setup
		.get("*", (ctx) => ctx.react.handleRequest(ctx))
		.listen({
			hostname: '0.0.0.0',
			development: process.env.NODE_ENV === "development"
		}, ({ url }) => {
			console.log('%s', url)
		})
