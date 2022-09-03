import { app } from "./app";

const PORT = process.env.API_PORT;

console.log(PORT);

app.listen(PORT);