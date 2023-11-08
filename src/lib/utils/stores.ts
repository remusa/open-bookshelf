import { Store } from 'tauri-plugin-store-api'

export const stores = new Map()

function getTauriStore(filename: string): Store {
	if (!stores.has(filename)) {
		const newStore = new Store(filename)
		stores.set(filename, newStore)
	}
	return stores.get(filename)
}

type ValueType = object | string | number | undefined

export async function useTauriStore(key: 'settings', defaultValue: ValueType, storeName = '.data.dat') {
	const store = getTauriStore(storeName)
	await store.set(key, defaultValue)
	await store.save()
	return store
}

// export const settingsStore = await useTauriStore('settings', {}, settingsFile)
