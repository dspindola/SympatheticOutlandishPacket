#!/usr/bin/env bun

import { args, command, commands, env, target } from "./codepark.shell";

const runtime = { CODEPARK_RUNTIME: process.env.CODEPARK_RUNTIME as string };

const options = Object.fromEntries(
  args.map((arg) => {
    return arg.split("=");
  })
);

const codeparkEnv = {
  SHELL_ARGS: Bun.inspect({ args }),
  FORCE_COLOR: "1",
  CODEPARK_CWD: process.cwd(),
  CODEPARK_DIR: `${process.cwd()}/.codepark`,
  CODEPARK_COMMAND: command,
  CODEPARK_ARGS: Bun.inspect({ args }),
  ...runtime,
  CODEPARK_RUNTIME_PATH:
    Bun.which(runtime.CODEPARK_RUNTIME) ?? runtime.CODEPARK_RUNTIME,
  CODEPARK_MODE: options["--mode"] ?? "dev",
  DEV:
    options["--mode"] === "dev" ??
    process.env.NODE_ENV === "development" ??
    true,
  PROD:
    options["--mode"] === "prod" ??
    process.env.NODE_ENV === "production" ??
    false,
};

Bun.write("./.codepark/env.json", JSON.stringify(codeparkEnv, null, 2));
Bun.write("./.codepark/options.json", JSON.stringify(options, null, 2));

// @ts-ignore
await Bun.$`${commands[command]}`.env({
  ...process.env,
  ...env[target],
  ...codeparkEnv,
});
