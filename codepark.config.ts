// @ts-nocheck
import type { ModuleTypes } from "./.codepark/types/replit-config.gen";

async function generateTypes(obj: any, moduleId: string) {
  const module = Bun.inspect(obj);
  const template = `
	export interface ModuleTypes ${module}

	declare module "$/${moduleId}"{
		interface ModuleTypes ${module}
	}`;

  await Bun.write(`.codepark/types/${moduleId}`, template);
}

await generateTypes(
  Bun.TOML.parse(await Bun.file("./.replit").text()),
  "replit-config.gen.d.ts"
);

await generateTypes(process.env, "repl-env.gen.d.ts");

const config = Bun.TOML.parse(await Bun.file(".replit").text()) as ModuleTypes;

export default { repl: config };
