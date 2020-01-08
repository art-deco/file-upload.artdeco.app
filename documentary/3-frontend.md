## Front End

The front-end is implemented as JSX components which are rendered with the _Preact_ library, which is served in a separate file. This allowed the delivered code to be as minimal as possible as Preact is smaller than _React_.

### building

The preprocess to building consists of automatic compiling the JSX code into plain JavaScript using the minimal reg-exp based `@a-la/jsx` transpiler. Transpiled files will be put in `depack-temp` directory and all files that reference them, since imports need to be renamed to include `.jsx` extension (otherwise, the compiler won't pick them up). If 3rd party dependency is referenced with JSX source code (like `photo-uploader`), it won't be transpiled, so that those packages need to ensure they publish build with already transpiled JSX.

%TREE frontend%

`index.js` in an entry file, which is responsible for authenticating the user via back-end, and renderning the gallery widget. The session handling will redirect users to `/callback` route, which will post a message using `window.postMessage`, and the user info will be automatically updated upon sign in.

### development

The development version is served using ES modules which are supported by the browser natively, meaning there does not need to be a compilation step involved which is very convenient since the actual compilation by _Google Closure Compiler_ takes about a minute. Still, the JSX is not understood by the browser, but the `jsx` middleware installed on the server allows to run the transpilation of JSX source code files when `.jsx` pages are requested. There's no support for JSX source maps, however the code formatting is kept intact so that each line is where the its source is (unless destructuring `...` is used in props).

%EXAMPLE: frontend/index%