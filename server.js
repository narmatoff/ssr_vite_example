import fs from 'node:fs/promises'
import express from 'express'

// окружение
const isProduction = 'production'
const port = 3000
const base = '/'

// забираем html в landingHtml
const landingHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

const app = express()

// import('vite').ViteDevServer | undefined
let vite

if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// обрабатываем все маршруты
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let htmlTemplate

    let render
    if (!isProduction) {
      // Получаем свежий шаблон в dev режиме
      htmlTemplate = await fs.readFile('./index.html', 'utf-8')
      htmlTemplate = await vite.transformIndexHtml(url, htmlTemplate)
      render = (await vite.ssrLoadModule('/src/entry-server.js')).render
    } else {
      // отдаем готовый шаблон из билда в прод режиме
      const landingHtml = await fs.readFile('./dist/client/index.html', 'utf-8')
      htmlTemplate = landingHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const rendered = await render(url)

    // собираем шаблон и отдаем клиенту
    const html = htmlTemplate
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
