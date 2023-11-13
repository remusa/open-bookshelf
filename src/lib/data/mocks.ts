import { bookSchema } from '$lib/types/types'
import { generateMock } from '@anatine/zod-mock'
import { faker } from '@faker-js/faker'
import imageUrl from '../images/mocks/51r6XIPWmoL._SX331_BO1,204,203,200_.jpg'

export const booksMock = Array(25)
	.fill(undefined)
	.map((_, i) => {
		const mock = generateMock(bookSchema, { seed: i })
		mock.id = i + 1
		mock.coverImageUrl = imageUrl
		mock.description = faker.lorem.sentences(5)
		mock.review = faker.lorem.sentences(3)
		return mock
	})
