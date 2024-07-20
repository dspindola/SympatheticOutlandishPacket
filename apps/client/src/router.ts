import type { FileSystemRouter } from "bun";

export type Router = FileSystemRouter;

export const createRouter = ({
  dir,
  origin,
  assetPrefix,
}: {
  dir: string;
  origin: string;
  assetPrefix: string;
}): Router =>
  new Bun.FileSystemRouter({
    dir: dir,
    style: "nextjs",
    fileExtensions: [".tsx"],
    origin,
    assetPrefix,
  });
