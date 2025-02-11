const Html = (body: any, filename: string) => {
    return <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{filename}</title>
            <script src="https://unpkg.com/htmx.org@2.0.4"></script> 
            <script src="https://unpkg.com/htmx-ext-sse@2.2.2/sse.js"></script>
        </head>
        <body>
            {body}
        </body>
    </html>
}
  
export default Html