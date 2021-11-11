import { Theme } from '../lib'
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
