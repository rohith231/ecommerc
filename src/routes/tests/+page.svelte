<script>
export let data //loading, err, faqs, count
</script>

{JSON.stringify(data.shortcode)}
<div class="prose">
	{data.shortcode.code}
	{@html data.faq.answer}
</div>
