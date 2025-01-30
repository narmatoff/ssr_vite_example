import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(_url) {
  const { app } = createApp()

// передача контекста SSR, который доступен в useSSRContext()
// @vitejs/plugin-vue внедряет код в функцию setup компонента,
// которая регистрирует себя на ctx.modules.

// После рендера ctx.modules будет содержать все компоненты,
// которые были инстанцированы во время вызова render.
  const ctx = {}
  const html = await renderToString(app, ctx)

  return { html }
}
