import { setup } from "app.setup";

export default () => setup.get("*", (ctx) => ctx.react.handleRequest(ctx));
