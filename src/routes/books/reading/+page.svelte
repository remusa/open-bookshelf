<script lang="ts">
	import { booksMock } from '$lib/data/mocks'
	import title from 'title'
	import type { BookType } from './../../lib/types/types.ts'

	const books: BookType[] = booksMock

	const listFormatter = new Intl.ListFormat('en-US')
	const pluralRules = new Intl.PluralRules('en-US')

	function pluralize(count: number, singular: string, plural: string) {
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
</script>

<svelte:head>
	<title>Reading</title>
	<meta name="description" content="Reading" />
</svelte:head>

<section>
	<h1>Reading</h1>

	<ul class="overflow-auto">
		{#each books as book (book.id)}
			{@const authors = listFormatter.format(book.authors.map((author) => author.name))}

			<li
				class="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-2"
			>
				<div
					class="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none shrink-0 rounded-xgl bg-clip-border"
				>
					<img src={book.coverImageUrl} alt="{book.title} book cover" class="object-cover w-full h-full" />
				</div>

				<div class="h-full p-6">
					<h6
						class="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-pink-500 uppercase"
					>
						{pluralize(authors.length, 'author', 'authors')}: {authors}
					</h6>
					<h2
						class="justify-between block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
					>
						{title(book.title)}
					</h2>
					<p
						class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700 first-letter:capitalize"
					>
						{book.description}
					</p>
					<p>{book.publisher}</p>
					<a class="inline-block" href="/books/{book.id}">
						<button
							class="flex flex-row items-end justify-end gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-pink-500 uppercase align-middle transition-all rounded-lg select-none hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
							type="button"
						>
							more information
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
								class="w-4 h-4"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
							</svg>
						</button>
					</a>
				</div>
			</li>
		{/each}
	</ul>
</section>
