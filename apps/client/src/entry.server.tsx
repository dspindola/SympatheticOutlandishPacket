import type { FileSystemRouter, MatchedRoute } from "bun";
import type { Context } from "elysia";
import { renderToReadableStream } from "react-dom/server";
import { App } from "./main";
import type React from "react";

type Ctx = Context & { router: FileSystemRouter }

export async function handleRequest(ctx: Ctx) {
	const { Route } = await match(ctx.path, ctx.router)

	const res = await renderStream(<App>
		<Route />
	</App>);

	return res
}

export async function match(path: string, router: FileSystemRouter) {
	try {
		const { filePath } = router.match(path) as MatchedRoute
		const module = (await import(filePath) as ({ Route: () => React.JSX.Element }))
		return module
	} catch (error) {
		throw new Error('error')
	}
}

export async function renderStream(Component: React.ReactElement) {
	try {
		const stream = await renderToReadableStream(<>{Component}</>)
		await stream.allReady
		return new Response(stream)
	} catch (error) {
		return new Response('not found')
	}
}
