# mobx-theme
Simple, flexible, reactive mobx theme detector and switcher.

![Created with ](https://img.shields.io/badge/Created%20with-@programmerraj/create-3cb371?style=flat)
[![TS-Standard - Typescript Standard Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

## Features
- Uses [`prefers-color-scheme`](https://stackoverflow.com/a/57795495/11145447) to detect initial theme
- Saves selected theme to local storage for the next page load.
- Updates theme between tabs (this is a feature of [`mobx-localstorage`](https://npmjs.com/package/mobx-localstorage))
- You can add more themes in addition to `'light'` and `'dark'`

## Example
This example uses [Webpack `style-loader` with `lazyStyleTag`](https://webpack.js.org/loaders/style-loader/#lazystyletag). You can see the complete folder in the `demo` dir.
```js
import { Theme } from 'mobx-theme'
import light from './light.lazy.css'
import dark from './dark.lazy.css'
import { autorunCleanup } from 'mobx-autorun-cleanup'
import { autorun } from 'mobx'

const themes = { dark, light }

const theme = new Theme()

const button = document.createElement('button')

autorunCleanup(() => {
  const currentTheme = theme.theme
  themes[currentTheme].use()
  console.log('Loaded theme', currentTheme)
  return () => {
    themes[currentTheme].unuse()
    console.log('Unloaded theme', currentTheme)
  }
})

autorun(() => {
  const switchesTo = theme.theme === 'dark' ? 'light' : 'dark'
  button.innerText = `Switch to ${switchesTo} theme`
  button.onclick = () => {
    theme.theme = switchesTo
  }
})

document.body.appendChild(button)
```

## Typedoc
https://chocolateloverraj/github.io/mobx-theme
