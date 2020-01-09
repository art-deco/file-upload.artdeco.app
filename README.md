# file-upload.artdeco.app

This app is the back-end for the [File Upload](https://file-upload.artdeco.app) website. It includes the server-side code for handling of file uploads in Node.JS within the _Idio_ web server. It also has front-end code for _Preact_ components for the JavaScript photo upload widget. The frond-end is built using _Closure Compiler_ run on JSX transpiled with `@a-la/jsx` package.

<a href="#README"><img src="file-upload.gif" alt="File Uploader"></a>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## On This Page

<a name="table-of-contents"></a>

- [On This Page](#on-this-page)
- [The Server](#the-server)
  * [0. neoluddite](#0-neoluddite)
  * [1. cors](#1-cors)
  * [2. compression](#2-compression)
  * [3. form](#3-form)
  * [4. frontend](#4-frontend)
  * [5. static](#5-static)
  * [6. session](#6-session)
- [NeoLuddite.Dev](#neoludditedev)
- [.env](#env)
- [Router](#router)
  * [watch routes](#watch-routes)
- [Front End](#front-end)
  * [building](#building)
  * [development](#development)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>



## The Server

The server is implemented using the `@idio/idio` package with the route initialisation by `@idio/router` for fast reloading of pages when on the development environment. The _GitHub_ authorisation for session demo is enabled with `@idio/github` which sets up the appropriate routes to perform 3-way handshake with _GitHub_ by obtaining a temporary token and then exchanging it for the access token, with which such information as the user name is obtained.

```jsx
const { app, url, middleware, router } = await idio({
  neoluddite: {
    key: NEOLUDDITE,
    env: process.env.NODE_ENV,
    app: appName,
  },
  cors: {
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
  csrfCheck: {},
  async jsonErrors(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (err.statusCode && err.statusCode >= 400 && err.statusCode <= 500) {
        err.message = err.message.replace(/^([^!])/, '!$1')
      }
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

The server is used in such a way as to enable all _Idio_ middleware. Additional custom middleware is added as functions to the config (`forms` to just parse form-data without file upload, `csrf` for validation of CSRF tokens either from the query or form-data, and `jsonErrors` to catch any errors and send them as JSON).

### 0. neoluddite

See the [NeoLuddite.Dev](#neoludditedev) section.

### 1. cors

CORS is needed since images are uploaded using _Ajax_ requests, therefore to send data to the server, the browser needs to make sure that the domain security is in tact (no sending data from 3rd party domains). When the application's back-end is hosted on the same domain as front-end, this middleware won't be activated as the browser won't send the `Origin` header (only `sec-fetch-mode: cors` and `sec-fetch-site: same-origin`). However, if the frontend was invoked from a page from a different domain (or subdomain), _CORS_ is needed. For example, when a back-end is at `file-upload.com` but the front-end is at `file-upload.github.io`, without CORS Ajax cross-domain requests will fail.

We also don't install CORS for each request, and only do it manually for routes that constitute Ajax _API_ request handlers.

### 2. compression

Before sending off data, the server can decide to run it through a gzip stream. However, compression for images is not very useful, therefore the standard compressible filter utilises the `mime-db` information to find out if the response should be compressed:

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

Uploaded files are saved on the disk for serving later on, and if the image can be compressed (e.g., if it's an SVG), the compression middleware will make sure that the response stream is run through GZIP.

### 3. form

Images are sent using `multipart/form-data` HTTP protocol that uses boundaries to split fields and files. By specifying the destination into which to upload files, this middleware will make `ctx.file` accessible to the context if files were uploaded. If no destination was provided, files would be saved in memory, which is not ideal since due to many parallel requests that can exhaust memory of the server.

_FormData_ middleware can be used to upload many files via a single request, in which case their information will be stored in the `ctx.files` property. Parsed body of the form with fields, is always made available via the `ctx.request.body` property. This allows to extract the `csrf` token which is sent along when uploading files and compare it to the one recorded in the session when it was initialised.

### 4. frontend

The frontend middleware is used for development purposes to transpile _JSX_ and serve components from `node_modules`, such as the _PhotoUploader_ component published as a separate package. The frontend bundle is compiled for production use, therefore this middleware is used only for development.

### 5. static

The `static` configuration contains 2 records for 2 purposes:
1. The compiled frontend bundle will be placed into the `docs` folder, so we use the static middleware to test it locally. On production, the `ctx.STATIC_HOST` variable will point to the actual host (github pages).
1. Photos are uploaded into the `upload` folder, and the static middleware will allow to serve them to clients.

### 6. session

File upload is only allowed to signed-in users. The authentication is performed with _GitHub_, which stores `github_user` info in session alongside a _CSRF_ token generated once for each user. The authentication information is made available via the `/auth` [route](routes/get/auth.js) which is accessed once the app is mounted. The middleware chain for file upload will first check if the user is present in the session, then that the declared _CSRF_ token is correct, and finally execute the server logic.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## NeoLuddite.Dev

_Idio's_ license is a restrictive Affero GPL v3, which means that to use the web-server for production on the internet (but not intranet), any application must publish its source code. Standard permissive licenses discourages fair compensation for intellectual capacity of people who worked on creating the middleware. To reward authors, the [neoluddite.dev](https://neoluddite.dev) service records usage of each piece of middleware via _Idio_, and transfers funds to the package maintainers from package consumers.

To join the service, one needs to sign up with their GitHub account, and receive an API key with 1m free Ludds (coins) each month. The key is then passed to the middleware configuration, along with the environment from the `process.env.NODE_ENV`, as only production use is billed. The `appName` is only required for sorting data on the portal.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## .env

When deployed, the app will need to have _environment_ variables set for its correct operation. Locally, these variables should be kept in the `.env` file, which will be parsed when the server starts.

```env
# .env
SESSION_KEY=this-is-my-session-key
GITHUB_ID=2a32ec482b43a6a4e314
GITHUB_SECRET=7041ecd99f95a9be86f62a32ec482b43a6a4e314
NEOLUDDITE=4c386e77-cb9d-4d36-9a1a-76714fed9626
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/4.svg?sanitize=true">
</a></p>


## Router

The router in this app is returned from the `idio` method, and can be used to assign routes. There are 2 routes used in the upload process: a) the actual file data handler, that saves file on the disk, and returns its ID together with the link to image, and b) the form-data handler with IDs of saved files. This is because files will first be put in the "upload sink", and only after that saved in the database using the `/save` route using their IDs. Such strategy would, for example, allow to substitute the sink route for another service, such as a serverless function, but save IDs using traditional method.

```js
router.post('/upload',
  // 1. parse session
  middleware.session,
  // 2. validate session
  (ctx, next) => {
    if (!ctx.session.github_user) throw new Error('!Authorisation required.')
    return next()
  },
  // 3. extract csrf from the query and match against session
  middleware.csrfCheck,
  // 4. receive an upload with "image" file field
  (ctx, next) => middleware.form.single('image')(ctx, next),
  // 5. handle uploaded file
  async (ctx) => {
    const { ext } = parse(ctx.file.originalname)
    ctx.body = {
      photoId: sync(18),
      success: 1,
      result: `/upload/${ctx.file.filename}${ext}`,
    }
  }
)
router.post('/save',
  middleware.session,
  (ctx, next) => middleware.form.none()(ctx, next),
  middleware.csrfCheck,
  (ctx) => {
    ctx.body = { data: ctx.request.body.photos }
  }
)
```

### watch routes

Additionally, the router has an extension called `@idio/router` that will read the `routes` directory, and install routes for HTTP methods from there (e.g., `get` and `post` methods in this app). This is an alternative to source-code based definition of routes. Routes from files can also define the middleware from the `middleware` object returned by _Idio_ using names of configured extensions, as shown below.

```js
/**
 * @type {import('../../').Middleware}
 */
export default (ctx) => {
  ctx.session = null
  ctx.body = { ok: 1 }
}

export const middleware = (route) =>
  ['cors', 'session', 'forms', 'csrfCheck', route]
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/5.svg?sanitize=true">
</a></p>

## Front End

The front-end is implemented as JSX components which are rendered with the _Preact_ library, which is served in a separate file. This allowed the delivered code to be as minimal as possible as Preact is smaller than _React_.

### building

The preprocess to building consists of automatic compiling the JSX code into plain JavaScript using the minimal reg-exp based `@a-la/jsx` transpiler. Transpiled files will be put in `depack-temp` directory and all files that reference them, since imports need to be renamed to include `.jsx` extension (otherwise, the compiler won't pick them up). If 3rd party dependency is referenced with JSX source code (like `photo-uploader`), it won't be transpiled, so that those packages need to ensure they publish build with already transpiled JSX.

```m
frontend
├── Auth
│   ├── AppUser.jsx
│   ├── User.jsx
│   ├── index.js
│   └── lib.js
├── index.jsx
└── social
    ├── GitHub
    │   ├── icon.jsx
    │   ├── index.jsx
    │   └── style.css
    └── LinkedIn
        ├── index.jsx
        └── style.css
```

`index.js` in an entry file, which is responsible for authenticating the user via back-end, and renderning the gallery widget. The session handling will redirect users to `/callback` route, which will post a message using `window.postMessage`, and the user info will be automatically updated upon sign in.

To test the compiled bundle, the `closure` script from _package.json_ is used. It will set the `CLOSURE` env variable that will make sure that the compiled bundle is served from the `docs` folder, instead of via the _FrontEnd_ middleware. This allows to make sure locally that the compiled source code is working, before pushing to CDN.

### development

The development version is served using ES modules which are supported by the browser natively, meaning there does not need to be a compilation step involved which is very convenient since the actual compilation by _Google Closure Compiler_ takes about a minute. Still, the JSX is not understood by the browser, but the `jsx` middleware installed on the server allows to run the transpilation of JSX source code files when `.jsx` pages are requested. There's no support for JSX source maps, however the code formatting is kept intact so that each line is where the its source is (unless destructuring `...` is used in props).

```jsx
import Form, { FormGroup, SubmitButton, SubmitForm } from '@depack/form'
import PhotoUploader from 'photo-uploader'
import { render } from 'preact'
import Auth from './Auth'
import AppUser from './Auth/AppUser'

const _host = window['HOST'] || 'http://localhost:5000'

/**
 * This is the form to upload pictures.
 */
class GalleryForm extends SubmitForm {
  constructor() {
    super()
    this.reset = this.reset.bind(this)
    this.submit = this.submit.bind(this)
    this.state = {
      ...super.state,
    }
  }
  render({ galleryId, confirmText, uploadedResults, csrf }) {
    const { formLoading, error, success } = this.state
    const uri = `${this.context.host}/upload?csrf=${csrf}`
    return (
      <Form onSubmit={this.submit}>
        <input name="csrf" value={csrf} type="hidden" />
        <input name="galleryId" value={galleryId} type="hidden" />
        <FormGroup label="File Upload" help="Please select some images and upload them.">
          <PhotoUploader uploadUri={uri} onPhotoUploaded={this.reset} onAdded={this.reset} onRemove={this.reset}
            uploadedResults={uploadedResults}
          />
        </FormGroup>
        <SubmitButton loading={formLoading} loadingText="Uploading..." confirmText={confirmText} />
      </Form>)
  }
}

class App extends Auth {
  constructor() {
    super()
    this.state = {
      ...this.state,
      uploadedResults: [],
    }
  }
  getChildContext() {
    return {
      host: this.props.host,
    }
  }
  addUploadedResults(results) {
    this.setState({ uploadedResults:
      [...this.state.uploadedResults, ...results],
    })
  }
  render() {
    const au = (<AppUser error={this.state.error} loading={this.state.loading} auth={this.state.auth} host={this.props.host} onSignOut={() => {
      this.setState({ auth: {} })
    }} />)
    if (!this.state.auth.github_user) return au

    return (<div>
      {au}
      <GalleryForm uploadedResults={this.state.uploadedResults} path="/save" confirmText="Save Uploads" submitFinish={async (result) => {
        // the form responds with ids of added uploads
        const { 'data': res } = await result.json()
        if (res) {
          this.addUploadedResults(res)
        }
      }} csrf={this.state.auth.csrf} />
    </div>)
  }
}
render(<App host={_host} />, window['preact-container'])
```


---

<table>
  <tr>
    <td><img src="https://avatars3.githubusercontent.com/u/38815725?v=4&amp;s=100" alt="art-deco"></td>
    <td>© <a href="https://www.artd.eco">Art Deco™</a> 2020</td>
  </tr>
</table>
