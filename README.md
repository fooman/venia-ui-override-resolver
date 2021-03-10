# Fooman VeniaUiOverrideResolver for PWA Studio

## Pre-Requisite
This project is intended for [PWA Studio](https://github.com/magento/pwa-studio) version 6+ started by using the `create-pwa` command.

## Install this package
```
 yarn add @fooman/venia-ui-override-resolver
```

or

```
npm i @fooman/venia-ui-override-resolver
```

## Usage
Copy individual files from `node_modules/@magento/venia-ui/lib` into `src/overrides/venia-ui` with the same file path. If the file has any relative imports change them back to point at the original. For example if you copied  
`node_modules/@magento/venia-ui/lib/components/Footer/footer.js` to  
`src/overrides/venia-ui/components/Footer/footer.js`

The below imports would point to nowhere:
```
import { mergeClasses } from '../../classify';
import defaultClasses from './footer.css';
import GET_STORE_CONFIG_DATA from '../../queries/getStoreConfigData.graphql';
```

If you do not plan on making any changes to those files point them back to the original files in `@magento/venia-ui`:
```
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/Footer/footer.css';
import GET_STORE_CONFIG_DATA from '@magento/venia-ui/lib/queries/getStoreConfigData.graphql';
```

For CSS files  
`node_modules/@magento/venia-ui/lib/components/Header/header.css`  copied to
`src/overrides/venia-ui/components/Header/header.css`

a relative import like
```
composes: input from '../TextInput/textInput.css';
```
would require changing to
```
composes: input from '~@magento/venia-ui/lib/components/TextInput/textInput.css';
```

For Peregrine  
Copy individual files from `node_modules/@magento/peregrine/lib` into `src/overrides/peregrine` with the same file path.

## Note
Please note that adding a new file requires restarting the watch process for the file to get recognised.

## Overriding other packages

The default list of package source folders (`'@magento/venia-ui/lib','@magento/peregrine/lib'`) can be overridden via the environment variable FOOMAN_OVERRIDEPACKAGES. This takes a list of comma separated package names in the form @namespace/packagename/srcfolder.

Example
```js
FOOMAN_OVERRIDEPACKAGES='@magento/venia-ui/lib,@magento/peregrine/lib,@magento/pagebuilder/lib' webpack-dev-server --progress --color --env.mode development
```
