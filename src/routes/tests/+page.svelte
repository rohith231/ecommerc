<script>
import SEO from '$lib/components/SEO/index.svelte'
import Skeleton from '$lib/ui/Skeleton.svelte'

export let data //loading, err, faqs, count

let seoProps = {
	title: `Frequently Asked Questions`,
	description: `Frequently Asked Questions`
}

let show = []

function showans(i) {
	show[i] = !show[i]
}
</script>

<SEO {...seoProps} />

{#if data.faqs[0]}
	<div class="prose">
		{@html data.faqs[0].answer}
	</div>
{/if}
