/* eslint-disable react/jsx-key */
/**
 * @type {import('../../').Middleware}
 */
export default async function index(ctx, next) {
  ctx.body = ctx.render([<div>
    <h1>Idio File Upload Example</h1>
    <p>This is a demo of <em>Idio</em> web server - a Koa server will essential middleware compiled with Closure Compiler to rely only on 2 dependencies. See <a target="_blank" noreferrer href="https://github.com/art-deco/file-upload.artdeco.app">GitHub repository</a> for the full source code and more explanation how this app works, and the <a target="_blank" noreferrer href="https://github.com/idiocc/idio">Idio page</a> to learn more about this Node.JS server.</p>
  </div>,
  <div id="preact-container"></div>,
  ctx.PROD ? <script>{`window.HOST='${ctx.HOST}'`}</script> : null,
  !ctx.CLOSURE ? <script type="module" src="node_modules/preact/dist/preact.mjs"/> : <script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.5.3/preact.min.js"/>,
  !ctx.CLOSURE ? <script type="module" src="frontend/"/> : <script src={`${ctx.STATIC_HOST}/index.js`}/>],
  { title: 'File Upload' })
  await next()
}

export const aliases = ['/']