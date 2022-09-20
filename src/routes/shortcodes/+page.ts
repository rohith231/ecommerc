import { getAPI } from '$lib/util/api'

export async function load({ url, params, fetch, parent, setHeaders }) {
	const { store } = await parent()
	let loading = false,
		err,
		faqs,
		count

	try {
		loading = true
		const res = await getAPI(`short-code?store=${store?.id}`)
		faqs = res?.data
		count = res?.count
	} catch (e) {
		err = e
	} finally {
		loading = false
	}
	setHeaders({
		'cache-control': 'public, max-age=300'
	})
	return { loading, err, faqs, count }
}
