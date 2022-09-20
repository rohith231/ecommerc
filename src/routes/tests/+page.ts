import { getAPI } from '$lib/util/api'

export async function load({ url, params, fetch, parent, setHeaders }) {
	const { store } = await parent()
	let faq
	const res = await getAPI(`faqs?store=${store?.id}`)
	faq = res?.data[0]

	const shortcode = await getShortCodeData('63218742139b1b312722cae8')
	faq.answer = faq.answer.replace('[aaa]', shortcode)

	return { faq }
}

export const getShortCodeData = async (code) => {
	const res = await getAPI(`short-code/${code}`)
	const shortcode = res.data
	return shortcode
}
