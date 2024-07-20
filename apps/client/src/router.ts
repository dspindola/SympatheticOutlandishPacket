import type { FileSystemRouter } from "bun"

export type Router = FileSystemRouter

export const createRouter = ({ dir, origin }: { dir: string, origin: string }): Router => new Bun.FileSystemRouter({
	dir: dir,
	style: "nextjs",
	fileExtensions: [".tsx"],
})