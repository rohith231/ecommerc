<script>
export let data //loading, err, faqs, count
</script>

<code>{JSON.stringify(data.shortcode)}</code>
<div class="prose">
	{data.shortcode.code}
	{@html data.faq.answer}
</div>
