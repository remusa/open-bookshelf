<script lang="ts">
	import { booksMock } from '$lib/data/mocks'
	import type { AuthorType, BookType } from '$lib/types/types'
	import { listFormatter } from '$lib/utils/pluralize'
	import { Book, Headphones, Tablet } from 'lucide-svelte'
	import type { PageData } from './$types'

	const books: BookType[] = booksMock
	const book = books.at(0)!
	const authors = listFormatter.format(book.authors.map((author: AuthorType) => author.name))

	export let data: PageData
	console.log(`🚀 ~ data:`, data)
</script>

<svelte:head>
	<title>{book.title}</title>
	<meta name="description" content={book.title} />
</svelte:head>

<section>
	<img src={book.coverImageUrl} alt="{book.title} book cover" class="object-cover w-full h-full" />

	<h1>Book {book.id}</h1>

	<div>
		<p>{book.title}</p>
		<p>{book.subtitle}</p>
		<p>{authors}</p>
		<p>{book.publishDate}</p>
		<p>
			{#if book.type === 'paper-book'}
				<Book class="inline-block" />
			{:else if book.type === 'e-book'}
				<Tablet class="inline-block" />
			{:else}
				<Headphones class="inline-block" />
			{/if}
			{book.type}
		</p>
	</div>

	<label>
		status
		<input type="text" value={book.status} />
	</label>

	<label>
		pages
		<input type="number" value={book.pageCount} />
	</label>

	<label>
		description
		<input type="text" value={book.description} />
	</label>

	<label class="uppercase">
		isbn
		<input type="number" value={book.isbn} />
	</label>

	<label>
		open library id
		<input type="text" value={book.openLibraryId} />
	</label>

	<label>
		review
		<input type="textarea" value={book.review} />
	</label>
</section>
