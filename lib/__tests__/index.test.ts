import 'mock-local-storage'
import { Theme } from '../index'
import { autorun } from 'mobx'

let dark: boolean
beforeAll(() => {
  globalThis.matchMedia = () => ({
    matches: dark
  }) as any
})
beforeEach(() => {
  localStorage.clear()
})

describe('initial value', () => {
  test('dark', () => {
    dark = true
    const theme = new Theme()

    expect(theme.theme).toBe('dark')
  })

  test('light', () => {
    dark = false
    const theme = new Theme()

    expect(theme.theme).toBe('light')
  })

  test('reads from localStorage', () => {
    dark = true
    localStorage.setItem(Theme.lsKey, 'light')
    expect(new Theme().theme).toBe('light')
  })
})

test('updates localStorage', () => {
  dark = false
  new Theme().theme = 'light'
  expect(localStorage.getItem(Theme.lsKey)).toBe(JSON.stringify('light'))
})

test('reactive', () => {
  const log: string[] = []
  dark = true
  const theme = new Theme()
  autorun(() => log.push(theme.theme))
  expect(log).toEqual(['dark'])
  theme.theme = 'light'
  expect(log).toEqual(['dark', 'light'])
})
