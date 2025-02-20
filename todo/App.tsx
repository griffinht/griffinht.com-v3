import { Hono } from 'hono'
import { css, Style } from 'hono/css'


const Test = () => {
  return <div>Test</div>
}

const app = new Hono()

import { execSync } from 'child_process'

const uptimeCardClass = css`
  background: #fff;
  border: 3px solid #ff4444;
  border-radius: 8px;
  padding: 1rem;
  margin: 0 auto;
  max-width: 300px;
`

const uptimeTitleClass = css`
  font-weight: bold;
  color: #ff4444;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 0.5rem;
`

const uptimeNumberClass = css`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  font-family: monospace;
  margin: 0.5rem 0;
`

const uptimeStatusClass = css`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  font-family: monospace;
`

const footerClass = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid #ddd;
`

const bodyClass = css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
`

const headingClass = css`
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
`

const listClass = css`
  padding-left: 1.5rem;
`

const listItemClass = css`
  margin: 0.5rem 0;
  color: #555;
`

const Uptime = () => {
  const uptimeOutput = execSync('uptime').toString().trim()
  
  return (
    <div class={uptimeCardClass}>
      <div class={uptimeTitleClass}>DAYS SINCE LAST INCIDENT</div>
      <div class={uptimeNumberClass}>{Math.floor(Math.random() * 365)}</div>
      <div class={uptimeStatusClass}>Current Uptime: {uptimeOutput}</div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer class={footerClass}>
      <Uptime />
    </footer>
  )
}

app.get('/', (c) => {
  return c.html((
    <html>
      <head>
        <title>My App</title>
        <Style />
      </head>
      <body class={bodyClass}>
        <h1 class={headingClass}>My App</h1>
        <Test />
        <ul class={listClass}>
          <li class={listItemClass}>no docker/kubernetes</li>
          <li class={listItemClass}>build apps not platforms - one repo for each app</li>
        </ul>
        <Footer />
      </body>
    </html>
  ))
})

export default app