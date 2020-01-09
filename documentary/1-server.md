## The Server

The server is implemented using the `@idio/idio` package with the route initialisation by `@idio/router` for fast reloading of pages when on the development environment. The _GitHub_ authorisation for session demo is enabled with `@idio/github` which sets up the appropriate routes to perform 3-way handshake with _GitHub_ by obtaining a temporary token and then exchanging it for the access token, with which such information as the user name is obtained.

%EXAMPLE: src/server%

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

%~%

## NeoLuddite.Dev

_Idio's_ license is a restrictive Affero GPL v3, which means that to use the web-server for production on the internet (but not intranet), any application must publish its source code. Standard permissive licenses discourages fair compensation for intellectual capacity of people who worked on creating the middleware. To reward authors, the [neoluddite.dev](https://neoluddite.dev) service records usage of each piece of middleware via _Idio_, and transfers funds to the package maintainers from package consumers.

To join the service, one needs to sign up with their GitHub account, and receive an API key with 1m free Ludds (coins) each month. The key is then passed to the middleware configuration, along with the environment from the `process.env.NODE_ENV`, as only production use is billed. The `appName` is only required for sorting data on the portal.

%~%

## .env

When deployed, the app will need to have _environment_ variables set for its correct operation. Locally, these variables should be kept in the `.env` file, which will be parsed when the server starts.

```env
# .env
SESSION_KEY=this-is-my-session-key
GITHUB_ID=2a32ec482b43a6a4e314
GITHUB_SECRET=7041ecd99f95a9be86f62a32ec482b43a6a4e314
NEOLUDDITE=4c386e77-cb9d-4d36-9a1a-76714fed9626
```

%~%
