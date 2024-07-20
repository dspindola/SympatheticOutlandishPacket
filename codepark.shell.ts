// @ts-nocheck
/// <reference path="./.codepark/types/replit-config.gen.d.ts"/>
/// <reference path="./.codepark/types/repl-env.gen.d.ts"/>
import codepark from "./codepark.config";

declare module "bun" {
  interface Env {
    HOSTNAME: string;
    REPL_ID?: string;
  }
}

export const target = process.env.REPL_ID ? "replit" : "local";

export const env = {
  replit: {
    HOSTNAME: "0.0.0.0",
    PORT: codepark.repl.ports[0].localPort.toString(),
  },
  local: {
    HOSTNAME: "localhost",
    PORT: "3000",
  },
};

export const commands = {
  run: codepark.repl.run,
  build: codepark.repl.compile,
};

export const [command, ...args] = process.argv.slice(2);
