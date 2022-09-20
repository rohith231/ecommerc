<script>
export let data //loading, err, faqs, count
</script>

{#each data.faqs as f, fx}
	<div class="prose">
		{@html f.data}
	</div>
{/each}
