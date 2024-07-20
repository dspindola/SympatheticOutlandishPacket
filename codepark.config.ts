// import replitConfig from "./.replit"


// function generateTypes(obj: any, moduleId: string) {
// 	const module = Bun.inspect(obj)
// 	const template = `
// 	export interface ModuleTypes ${module}

// 	declare module "$/${moduleId}"{
// 		interface ModuleTypes ${module}
// 	}`
// 	console.log(template)
// 	Bun.write(`./.codepark/types/${moduleId}`, template)
// }

// generateTypes(replitConfig, "replit-config.gen.d.ts")
// generateTypes(process.env, "repl-env.gen.d.ts")

// const cwd = Bun.env.REPL_HOME;

// const workspace = new Bun.Glob("{apps,packages}/**/package.json").scanSync({
// 	cwd
// });

// const scannedFiles = Array.from(workspace)

// console.log(scannedFiles)