<script>
export let data //loading, err, faqs, count
</script>

{#if data.faqs[0]}
	<div class="prose">
		{@html data.faqs[0].answer}
	</div>
{/if}
