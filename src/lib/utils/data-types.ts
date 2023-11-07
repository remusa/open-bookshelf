export async function generateUUID() {
	const response = await fetch('https://www.uuidtools.com/api/generate/v1')

	if (!response.ok) throw new Error('HTTP error ' + response.status)

	const data = await response.json()

	if (!Array.isArray(data) || data.length < 1) {
		throw new Error('Failed to get id')
	}

	return data.at(0)
}
