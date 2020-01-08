## The Server

The server is implemented using the `@idio/idio` package with the route initialisation by `@idio/router` for fast reloading of pages when on the development environment. The _GitHub_ authorisation for session demo is enabled with `@idio/github` which sets up the appropriate routes to perform 3-way handshake with _GitHub_ by obtaining a temporary token and then exchanging it for the access token, with which such information as the user name is obtained.

%EXAMPLE: src/server%

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

%~%
