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

%~%