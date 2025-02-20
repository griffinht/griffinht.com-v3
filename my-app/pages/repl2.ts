import { Hono } from "hono";
const app = new Hono();


async function chat(request: string) {
    const fs = require('fs').promises;
    
    // Write request to file
    await fs.writeFile('request.txt', request, 'utf8');
    
    // Poll for response file
    let response = null;
    const maxAttempts = 60; // Maximum 60 attempts (30 seconds total)
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            response = await fs.readFile('response.txt', 'utf8');
            if (response) {
                // Delete the response file after reading it
                await fs.unlink('response.txt');
                break;
            }
        } catch (error) {
            // File doesn't exist yet, wait 500ms before trying again
            await new Promise(resolve => setTimeout(resolve, 500));
            attempts++;
        }
    }
    
    if (!response) {
        return 'Timeout waiting for response';
    }
    return response;
}
const system = 'no javascript just use <a href=""> and <form> tags'

const page = () => {
    const fs = require('fs').promises;

    const page = fs.readFileSync('page.html', 'utf8');

    return page;
}

app.get("*", async (c) => {
    const url = c.req.url;
    const p = await page();
    console.log(url)
    // put the page in rag
    return c.html(chat(`INSTRUCTIONS: ${system}\n\n${page}\n\nGET ${url}`))
});

app.post("*", async (c) => {
    const message = await c.req.text();
    const url = c.req.url;
    const p = await page();
    console.log(url)

    // put the page in rag
    return c.html(chat(`INSTRUCTIONS: ${system}\n\n${page}\n\nPOST ${url}\n\n${message}`))
});

export default app;