import { computed, makeObservable } from 'mobx'
import { LocalStorage } from 'mobx-localstorage'
import { matchMedia } from 'mobx-matchmedia'

export type DefaultThemes = 'dark' | 'light'

export class Theme<T extends DefaultThemes extends T ? string : never = DefaultThemes> {
  static readonly lsKey = 'theme'

  private readonly localStorage = new LocalStorage()

  constructor () {
    makeObservable(this, {
      theme: computed,
      selectedTheme: computed
    })
  }

  get theme (): T {
    return this.localStorage.getItem(Theme.lsKey) ??
      (matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light')
  }

  get selectedTheme (): T | undefined {
    return this.localStorage.getItem(Theme.lsKey) ?? undefined
  }

  set selectedTheme (theme: T | undefined) {
    if (theme !== undefined) this.localStorage.setItem(Theme.lsKey, theme)
    else this.localStorage.removeItem(Theme.lsKey)
  }
}
