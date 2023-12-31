export const listFormatter = new Intl.ListFormat('en-US')
export const pluralRules = new Intl.PluralRules('en-US')

export function pluralize(count: number, singular: string, plural: string) {
	const grammaticalNumber = pluralRules.select(count)
	switch (grammaticalNumber) {
		case 'one':
			return singular
		case 'other':
			return plural
		default:
			throw new Error('Unknown: ' + grammaticalNumber)
	}
}
