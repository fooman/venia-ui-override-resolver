#Fooman VeniaUiOverrideResolver for PWA Studio

## Pre-Requisite
This project is intended for [PWA Studio](https://github.com/magento/pwa-studio) version 6+.

To install the beta version of PWA Studio you can use:
```
git clone git@github.com:magento/pwa-studio.git tmp-pwa-create
cd tmp-pwa-create
git checkout release/6.0
yarn install
DEBUG_PROJECT_CREATION=1 packages/create-pwa/bin/create-pwa
```

## Install this package
```
 yarn add @fooman/venia-ui-override-resolver
```

or

```
npm i @fooman/venia-ui-override-resolver
```

## Usage
Copy individual files from `node_modules/@magento/venia-ui/lib` into `src/overrides/` with the same file path. If the file has any relative imports change them back to point at the original. For example if you copied  
`node_modules/@magento/venia-ui/lib/components/Footer/footer.js` to  
`src/overrides/components/Footer/footer.js`

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
`src/overrides/components/Header/header.css`

a relative import like
```
composes: input from '../TextInput/textInput.css';
```
would require changing to
```
composes: input from '../../../../node_modules/@magento/venia-ui/lib/components/TextInput/textInput.css';
```

## Note
Please note that adding a new file requires restarting the watch process for the file to get recognised.