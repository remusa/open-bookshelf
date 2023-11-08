import type { SettingsKeys } from '$lib/types/types'
import { appWindow } from '@tauri-apps/api/window'
import { Store } from 'tauri-plugin-store-api'
import { stores } from './stores'

const settingsFile = '.settings.json'

export const settingsStore = new Store(settingsFile)
stores.set(settingsFile, settingsStore)

export async function updateSettings(key: SettingsKeys, value: boolean) {
	switch (key) {
		case 'alwaysOnTop': {
			await appWindow.setAlwaysOnTop(value)
			break
		}
		case 'darkMode': {
			break
		}
		default:
			throw new Error('Invalid setting')
	}
	await settingsStore.set(key, value)
	await settingsStore.save()
}

export async function loadSettings(key: SettingsKeys) {
	const value = await settingsStore.get(key)
	return value
}
