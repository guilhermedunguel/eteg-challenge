import { env } from "../env";
import { app } from "./app";

app.listen({ port: env.SERVER_PORT }, () => {
  console.log(`> HTTP Server Running at: http://localhost:${env.SERVER_PORT}/`);
});
