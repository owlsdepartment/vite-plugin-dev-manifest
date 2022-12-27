# Vite Plugin Dev Manifest

Vite plugin for generating a dev version of manifest file for backend integration, so you can include script and styles without explicitly knowing what to include.

This way, you can run `vite` dev server and enjoy cool features, like HMR.

## Instalation

```bash
# yarn
yarn add -D vite-plugin-dev-manifest

# npm
npm install -D vite-plugin-dev-manifest
```

## Usage

Add it to your Vite config

```js
import { defineConfig } from 'vite';
import devManifest from 'vite-plugin-dev-manifest';

export default defineConfig({
    plugins: [
        devManifest(),
        // ...
    ],

    // ...

    build: {
        rollupOptions: {
            // specify your input files here, as stated in Vite config https://vitejs.dev/config/#build-rollupoptions
            input: 'src/main.ts'
        }
    }
})
```

Manifest file will be generated in your `dist` folder, specified in Vite config. So with default settings it would be something like:

`{projectRoot}/dist/manifest.dev.json`

Generated manifest will have following structure:

```jsonc
{
    // url to base folder in your local dev server
    "url": "http://localhost:3000/",
    // inputs specified in 'build.rollupOptions.input'
	"inputs": {
		"main": "src/main.ts"
	}
}
```

It uses your final config to find root, base path and inputs. To retrieve input URL in dev environment, concat it's value with URL like this:

`{url}{inputs[input]}`

Based on our example, it would be: `http://localhost:3000/src/main.ts`

__NOTE:__ In manifest file, `inputs` field is always an object with a keys and values, even if `rollupOptions.input` is string or an array

## Plugin ordering

`vite-plugin-dev-manifest` forces itself to be registered in later stages, but if more plugins uses `enforce: post`, it may be needed to order this plugin as the last one, f. ex.: when using along [`vite-plugin-symfony`](https://github.com/lhapaipai/vite-plugin-symfony).

## Config

| Name | Type | Default | Description |
| -- | -- | -- | -- |
| `manifestName` | `string` | `manifest.dev` | name of the generated manifest file in dist folder |
| `omitInputs` | `string[]` | `[]` | inputs to omit in generated manifest. It is useful when you want to build some styles or scripts, but not include it in your front app |
| `delay` | `number` | `undefined` | you can delay creating of the manifest file if any of the plugins clears `dist` folder |

## Tips

We recommend using [vite-plugin-live-reload](https://github.com/arnoson/vite-plugin-live-reload) to reload site when editing your backend files. Don't worry tho, HMR still works for served assets.

## License

Library is under [MIT License](LICENSE)
