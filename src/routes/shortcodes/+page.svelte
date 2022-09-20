<script>
export let data //loading, err, faqs, count
</script>

<div class="prose">
	<b> Code: {@html data.faqs[0].code}</b>
	<br />
	<br />
	<br />
	<br />
	{@html data.faqs[0].data}
</div>
