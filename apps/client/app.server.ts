import App from "app.entry";

const app = App().listen({
  port: process.env.PORT,
  hostname: process.env.HOSTNAME,
});

console.log(`Server running at ${app.server?.url}`);
