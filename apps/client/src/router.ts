import type { FileSystemRouter } from 'bun'

export type Router = FileSystemRouter

export const createRouter = ({
  dir,
  origin,
  assetPrefix,
}: {
  dir: string
  origin: string
  assetPrefix: string
}): Router => {
  const router = new Bun.FileSystemRouter({
    dir: dir,
    style: 'nextjs',
    fileExtensions: ['.tsx', '.ts', '.js', '.jsx', '.mdx', '.html', '.css'],
    origin,
    assetPrefix,
  })

  router.reload()

  return router
}
