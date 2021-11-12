import 'mock-local-storage'
import { Theme } from '../index'
import { autorun, runInAction } from 'mobx'
import { setMedia, matchMedia } from 'mock-match-media'

beforeAll(() => {
  globalThis.window = globalThis as any
  globalThis.matchMedia = matchMedia
})
beforeEach(() => {
  localStorage.clear()
})

describe('initial value', () => {
  test('dark', () => {
    setMedia({
      'prefers-color-scheme': 'dark'
    })
    const theme = new Theme()

    expect(theme.theme).toBe('dark')
  })

  test('light', () => {
    setMedia({
      'prefers-color-scheme': 'light'
    })
    const theme = new Theme()

    expect(theme.theme).toBe('light')
  })

  test('reads from localStorage', () => {
    setMedia({
      'prefers-color-scheme': 'dark'
    })
    localStorage.setItem(Theme.lsKey, 'light')
    expect(new Theme().theme).toBe('light')
  })
})

test('updates localStorage', () => {
  setMedia({
    'prefers-color-scheme': 'light'
  })
  new Theme().selectedTheme = 'light'
  expect(localStorage.getItem(Theme.lsKey)).toBe(JSON.stringify('light'))
})

test('reactive', () => {
  const log: string[] = []
  setMedia({
    'prefers-color-scheme': 'dark'
  })
  const theme = new Theme()
  autorun(() => log.push(theme.theme))
  expect(log).toEqual(['dark'])
  runInAction(() => {
    theme.selectedTheme = 'light'
  })
  expect(log).toEqual(['dark', 'light'])
  runInAction(() => {
    theme.selectedTheme = undefined
  })
  expect(log).toEqual(['dark', 'light', 'dark'])
})

test('updates on mediaQuery change', () => {
  const log: string[] = []
  const expectedLog: string[] = []
  setMedia({
    'prefers-color-scheme': 'dark'
  })
  const theme = new Theme()
  autorun(() => log.push(theme.theme))
  expectedLog.push('dark')
  expect(log).toEqual(expectedLog)
  setMedia({
    'prefers-color-scheme': 'light'
  })
  expectedLog.push('light')
  expect(log).toEqual(expectedLog)
})
