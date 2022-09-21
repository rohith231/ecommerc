import { getAPI } from '$lib/util/api'

export async function load({ url, params, fetch, parent, setHeaders }) {
	const { store } = await parent()
	let faq
	const res = await getAPI(`faqs?store=${store?.id}`)
	faq = res?.data[0]

	var regex = /\[(.*?)\]/gm;

	var regex1 = /[\[\]']+/gm;

	const shorttag = JSON.stringify(faq.answer);
	var shortco = shorttag.match(regex);
	
	for (let i = 0; i < shortco.length; i++) {
		const shortcod = shortco[i].replace(regex1, '');
		const codedata = await getShortCodeData(shortcod)
	    faq.answer = faq.answer.replace(shortco[i], codedata)
	}
	return { faq }
	
	
}


export const getShortCodeData = async (code) => {
	const res = await getAPI(`short-code/${code}`)
	const shortcode = res.data
	return shortcode
}
