import { getAPI } from '$lib/util/api'

export async function load({ url, params, fetch, parent, setHeaders }) {
	const { store } = await parent()
	let faq, shortcode
	const res = await getAPI(`faqs?store=${store?.id}`)
	const res1 = await getAPI(`short-code?store=${store?.id}`)
	faq = res?.data[0]
	shortcode = res1?.data[0]
	return { faq, shortcode }
}
