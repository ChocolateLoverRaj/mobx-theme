import { computed, makeObservable } from 'mobx'
import { LocalStorage } from 'mobx-localstorage'

export type DefaultThemes = 'dark' | 'light'

export type ThemeCallback<T extends DefaultThemes extends T ? string : never = DefaultThemes> =
(theme: T) => void

export class Theme<T extends DefaultThemes extends T ? string : never = DefaultThemes> {
  static readonly lsKey = 'theme'

  private readonly localStorage = new LocalStorage()

  constructor () {
    if (!this.localStorage.has(Theme.lsKey)) {
      this.localStorage.setItem(
        Theme.lsKey, matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }

    makeObservable(this, {
      theme: computed
    })
  }

  get theme (): T {
    return this.localStorage.getItem(Theme.lsKey)
  }

  set theme (theme: T) {
    this.localStorage.setItem(Theme.lsKey, theme)
  }
}
