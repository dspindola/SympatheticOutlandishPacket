#!/usr/bin/env bun
/// <reference path="./.codepark/types/replit-config.gen.d.ts"/>
/// <reference path="./.codepark/types/repl-env.gen.d.ts"/>
import codepark from "./codepark.config";

declare module "bun" {
  interface Env {
    HOSTNAME: string;
    REPL_ID?: string;
  }
}

const target = process.env.REPL_ID ? "replit" : "local";

const env = {
  replit: {
    HOSTNAME: "0.0.0.0",
    PORT: codepark.repl.ports[0].localPort.toString(),
  },
  local: {
    HOSTNAME: "localhost",
    PORT: "3000",
  },
};

const commands = {
  run: codepark.repl.run,
  build: codepark.repl.compile,
};

const [command, ...args] = process.argv.slice(2);

await Bun.$`${commands[command]}`.env({
  ...process.env,
  ...env[target],
  SHELL_ARGS: Bun.inspect({ args }),
});
