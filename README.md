# file-upload.artdeco.app

This app is the back-end for the [File Upload](https://file-upload.artdeco.app) website. It has front-end code for _Preact_ components for the JavaScript photo upload widget. The frond-end is built using _Closure Compiler_ run on JSX transpiled with `@a-la/jsx` package.

<a href="#README"><img src="file-upload.gif" alt="File Uploader"></a>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## On This Page

<a name="table-of-contents"></a>

- [On This Page](#on-this-page)
- [The Server](#the-server)
  * [1. cors](#1-cors)
  * [2. compression](#2-compression)
  * [3. form](#3-form)
  * [4. frontend](#4-frontend)
  * [5. static](#5-static)
  * [6. session](#6-session)
- [Front End](#front-end)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>



## The Server

The server is implemented using the `@idio/idio` package with the route initialisation by `@idio/router` for fast reloading of pages when on the development environment. The _GitHub_ authorisation for session demo is enabled with `@idio/github` which sets up the appropriate routes to perform 3-way handshake with _GitHub_ by obtaining a temporary token and then exchanging it for the access token, with which such information as the user name is obtained.

```jsx
const { app, url, middleware, router } = await idio({
  cors: {
    use: true,
    origin: PROD && [FRONT_END, HOST],
    credentials: true,
  },
  compress: { use: true },
  form: {
    dest: 'upload',
  },
  frontend: { use: !PROD },
  static: [{ use: CLOSURE, root: 'docs' }, {
    use: true,
    root: 'upload',
  }],
  session: { keys: [SESSION_KEY] },
  forms: {
    middlewareConstructor() {
      return async (ctx, next) => {
        const f = middleware.form.any()
        await f(ctx, next)
      }
    },
  },
  csrf: { middlewareConstructor() {
    return async (ctx, next) => {
      const { session } = ctx
      if (!session) throw new Error('!Session does not exist.')
      const { csrf } = session
      if (!csrf) {
        ctx.body = { error: '!Not signed in' }
        ctx.status = 400
        return
      }
      const { csrf: c1 } = ctx.request.body
      const { csrf: c2 } = ctx.query
      const c = c1 || c2
      if (csrf != c) {
        ctx.body = { error: '!Invalid csrf token.' }
        ctx.status = 401
        return
      }
      await next()
    }
  } },
  async jsonErrors(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (err.message.startsWith('!')) {
        ctx.body = { error: err.message.replace('!', '') }
        console.log(err.message)
      } else {
        ctx.body = { error: 'internal server error' }
        err.stack = cleanStack(err.stack)
        app.emit('error', err)
      }
    }
  },
}, { port })
```

The server is used in such a way as to enable all _Idio_ middleware:

### 1. cors

Cors is needed since images are uploaded using Ajax requests, therefore to send data to the server, the browser needs to make sure that the domain security is in tact (no sending data from 3rd party domains).

### 2. compression

Compression for images is not useful, therefore the standard compressible filter utilises the `mime-db` information to find out if the response should be compressed:

```json
{
  "image/svg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["svg","svgz"]
  },
  "image/png": {
    "source": "iana",
    "compressible": false,
    "extensions": ["png"]
  },
  "and so": "on"
}
```

Uploaded files are saved on the disk for serving later on, and if the image can be compressed (e.g., an SVG), the compression middleware will make sure that the response stream is run through GZIP.

### 3. form

Images are sent using `multipart/form-data` HTTP protocol that uses boundaries to split fields and files. By specifying the destination into which to upload files, this middleware will make `ctx.file` accessible to the context if files were uploaded. If no destination was provided, files would be saved in memory, which is not ideal since due to many parallel requests that can exhaust memory of the server.

### 4. frontend

The frontend middleware is used for development purposes to render JSX and serve components from `node_modules`, such as the _PhotoUploader_ component published as a separate package. The frontend bundle is compiled for production use, therefore this middleware is used only for development.

### 5. static

The `static` configuration contains 2 records for 2 purposes:
1. The compiled frontend bundle will be placed into the `docs` folder, so we use the static middleware to test it locally. On production, the `ctx.STATIC_HOST` variable will point to the actual host (github pages).
1. Photos are uploaded into the `upload` folder, and the static middleware will allow to serve them to clients.

### 6. session

File upload is only allowed to signed-in users. The authentication is performed with _GitHub_, which stores `github_user` info in session alongside a _CSRF_ token generated once for each user. The authentication information is made available via the `/auth` [route](routes/get/auth.js) which is accessed once the app is mounted. The middleware chain for file upload will first check if the user is present in the session, then that the declared _CSRF_ token is correct, and finally execute the server logic.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>


## Front End

The front-end is implemented as JSX components which are rendered with the _Preact_ library. This allowed the delivered code to be as minimal as possible. The process of building consists of compiling the JSX code into plain JavaScript using the minimal reg-exp based `@a-la/jsx` transpiler. The development version is served using ES modules which are supported by the browser natively, meaning there does not need to be a compilation step involved which is very convenient since the actual compilation by Google Closure takes about a minute. Still, the JSX is not understood by the browser, but the `jsx` middleware installed on the server allows to run the transpilation of JSX source code files when `.jsx` pages are requested. There's no support for JSX source maps, however the code formatting is kept intact so that each line is where the its source is.

```js
import { Component } from 'preact'
import unfetch from 'unfetch'

/**
 * Fetches authorisation data from the server.
 */
export default class Auth extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      error: null,
      /** @type {!Auth} */
      auth: {},
    }
    this.pml = /** @type {function(!Event)} */(this.postMessageListener.bind(this))

    window.addEventListener('message', this.pml, false)
  }
  componentDidMount() {
    this.auth()
  }
  async auth() {
    this.setState({ loading: true })
    try {
      const res = await unfetch(`${this.props.host}/auth`, {
        credentials: 'include',
      })
      const auth = await res.json()
      this.setState({ auth })
    } catch (err) {
      this.setState({ error: err.message })
    } finally {
      this.setState({ loading: false })
    }
  }
  /**
   * @param {!MessageEvent} event
   */
  postMessageListener(event) {
    const { data, origin } = event
    if (origin != this.props.host) return
    if (data == 'signedin') this.auth()
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.pml)
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
```


---

<table>
  <tr>
    <td><img src="https://avatars3.githubusercontent.com/u/38815725?v=4&amp;s=100" alt="art-deco"></td>
    <td>© <a href="https://www.artd.eco">Art Deco™</a> 2020</td>
  </tr>
</table>
