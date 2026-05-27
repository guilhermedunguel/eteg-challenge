import { env } from "../env";
import { app } from "./app";

app.listen({ port: env.SERVER_PORT, host: "0.0.0.0" }, () => {
  console.log(`> HTTP Server Running at: http://localhost:${env.SERVER_PORT}/`);
});
