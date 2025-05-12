> [!WARNING]  
> I no longer use or maintain this library. I don't really code in JavaScript anymore (I switched to Rust). If you want to maintain or fork it let me know (you can email me) and I can put the link here.

# mobx-theme
Simple, flexible, reactive mobx theme detector and switcher.

![Created with ](https://img.shields.io/badge/Created%20with-@programmerraj/create-3cb371?style=flat)
[![TS-Standard - Typescript Standard Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

## Features
- Uses [`prefers-color-scheme`](https://stackoverflow.com/a/57795495/11145447) to detect initial theme
- Saves selected theme to local storage for the next page load.
- Updates theme between tabs (this is a feature of [`mobx-localstorage`](https://npmjs.com/package/mobx-localstorage))
- Updates theme when preferred color scheme changes (this is a feature of [`mobx-matchmedia`](https://npmjs.com/package/mobx-matchmedia))
- You can add more themes in addition to `'light'` and `'dark'`

## Example
This example uses [Webpack `style-loader` with `lazyStyleTag`](https://webpack.js.org/loaders/style-loader/#lazystyletag). You can see the complete folder in the `demo` dir.
```jsx
import { Theme } from 'mobx-theme'
import light from './light.lazy.css'
import dark from './dark.lazy.css'
import { autorunCleanup } from 'mobx-autorun-cleanup'
import { render } from 'react-dom'
import { observer } from 'mobx-react-lite'

const themes = { dark, light }

const theme = new Theme()

autorunCleanup(() => {
  const currentTheme = theme.theme
  themes[currentTheme].use()
  console.log('Loaded theme', currentTheme)
  return () => {
    themes[currentTheme].unuse()
    console.log('Unloaded theme', currentTheme)
  }
})

const Component = observer(() => (
  <select
    value={theme.selectedTheme ?? 'system'}
    onChange={({ target: { value } }) => {
      theme.selectedTheme = value === 'system' ? undefined : value
    }}
  >
    <option value='dark'>Dark</option>
    <option value='light'>Light</option>
    <option value='system'>System</option>
  </select>
))

render(<Component />, document.getElementById('app'))

```

## Typedoc
https://chocolateloverraj.github.io/mobx-theme
