import { appWindow } from '@tauri-apps/api/window'

export async function setAlwaysOnTop(value: boolean) {
	await appWindow.setAlwaysOnTop(value)
}
