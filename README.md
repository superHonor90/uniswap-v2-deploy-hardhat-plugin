# uniswap-v2-deploy-plugin

Deploy Uniswap V2 contracts in development.

## Installation

```sh
$ yarn add uniswap-v2-deploy-plugin
```

Import the plugin in your `hardhat.config.js`:

```js
require("uniswap-v2-deploy-plugin");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "uniswap-v2-deploy-plugin";
```

Great! Now to deploy the contracts in your tests, checkout the [swap.ts](test/swap.ts) file to see how you'd use this plugin to ease your development process.
