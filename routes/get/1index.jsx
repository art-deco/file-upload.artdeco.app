/* eslint-disable react/jsx-key */
/**
 * @type {import('../../').Middleware}
 */
export default async function index(ctx, next) {
  ctx.body = ctx.render([<div>
    <h1>Idio File Upload Example</h1>
  </div>,
  <div id="preact"></div>,
  !ctx.CLOSURE ? <script type="module" src="node_modules/preact/dist/preact.mjs"/> : <script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.5.3/preact.min.js"/>,
  !ctx.CLOSURE ? <script type="module" src="frontend/"/> : <script src={`${ctx.STATIC_HOST}/index.js`}/>],
  { title: 'File Upload' })
  await next()
}

export const aliases = ['/']