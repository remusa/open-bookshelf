<script lang="ts">
	import { generateUUID } from '$lib/utils/data-types'
	import { createTagsInput, melt, type Tag } from '@melt-ui/svelte'
	import { X } from 'lucide-svelte'
	import type { ActionData, PageData } from './$types'

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags },
	} = createTagsInput({
		defaultTags: ['productivity', 'fiction'],
		unique: true,
		add: async (tag: string) => {
			const id = await generateUUID()
			return { id, value: tag.toLowerCase() }
		},
		update: async (tag: Tag) => {
			return { id: tag.id, value: tag.value.toLowerCase() }
		},
		remove: async (t: Tag) => {
			if (t.value === 'one') return false
			return true
		},
	})

	export let data: PageData
	console.log(`🚀 ~ data:`, data)

	export let form: ActionData
	console.log(`🚀 ~ form:`, form)
</script>

<section>
	<h1>Add new book</h1>

	<form method="POST">
		<label for="cover">
			select cover
			<input type="file" name="cover" id="cover" />
		</label>

		<label for="title">
			title
			<input type="text" name="text" id="title" />
		</label>

		<label for="subtitle">
			subtitle
			<input type="text" name="text" id="subtitle" />
		</label>

		<label for="author">
			author
			<input type="text" name="text" id="author" />
		</label>

		<label for="book-type">
			book type
			<select name="book-type" id="book-type">
				<option value="paper-book">paper book</option>
				<option value="ebook">e-book</option>
				<option value="audiobook">audiobook</option>
			</select>
		</label>

		<div class="debug flex justify-evenly">
			<button class="debug" on:click={() => null}>finished</button>
			<button class="debug" on:click={() => null}>in progress</button>
			<button class="debug" on:click={() => null}>for later</button>
			<button class="debug" on:click={() => null}>in progress</button>
		</div>

		<label for="start-date">
			select reading start date
			<input type="datetime-local" name="start-date" id="start-date" />
		</label>

		<label for="end-date">
			select reading end date
			<input type="datetime-local" name="end-date" id="end-date" />
		</label>

		<label for="number-of-pages">
			pages
			<input type="number" />
		</label>

		<label for="publication-year">
			publication year
			<input type="date" />
		</label>

		<label for="description">
			description
			<input type="text" />
		</label>

		<label for="isbn">
			isbn
			<input type="number" />
		</label>

		<label for="open-library-id">
			isbn
			<input type="text" />
		</label>

		<div class="flex flex-col items-start justify-center gap-2">
			<div
				use:melt={$root}
				class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-blue-700
    focus-within:ring focus-within:ring-blue-400"
			>
				{#each $tags as t (t.id)}
					<div
						use:melt={$tag(t)}
						class="flex items-center overflow-hidden rounded-md bg-blue-200 text-blue-900 [word-break:break-word]
      data-[disabled]:bg-blue-300 data-[selected]:bg-blue-400 data-[disabled]:hover:cursor-default
        data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
					>
						<span class="flex items-center border-r border-white/10 px-1.5">{t.value}</span>
						<button use:melt={$deleteTrigger(t)} class="flex items-center h-full px-1 enabled:hover:bg-blue-300">
							<X class="square-3" />
						</button>
					</div>
					<div
						use:melt={$edit(t)}
						class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
					/>
				{/each}

				<input
					use:melt={$input}
					type="text"
					placeholder="Enter tags..."
					class="min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 data-[invalid]:text-red-500"
				/>
			</div>
		</div>

		<label for="review">
			my review
			<input type="text" />
		</label>

		<span class="flex justify-evenly">
			<button class="">cancel</button>
			<button class="" type="submit">add book</button>
		</span>
	</form>
</section>
