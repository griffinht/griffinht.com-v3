import { Hono } from "hono";
//import { jsx } from "react/jsx-runtime";
//jsx("Box", { width: 5 }, "Hello");
import Hi from "./Bruh.mdx";

const Hi2 = () => {
    return <div>hi</div>;
}



const app = new Hono();

app.get("/", (c) => {
  return c.render(<Hi />);
});

export default app;