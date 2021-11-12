import { Theme } from '../lib'
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
