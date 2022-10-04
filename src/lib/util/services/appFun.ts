import { goto, invalidate } from '$app/navigation'
import { page } from '$app/stores'


export async function sortNow(s) {
	if (s == 'null' || s == null || s == undefined || s == 'undefined') {
		$page.url.searchParams.delete('sort')
	} else {
		await $page.url.searchParams.set('sort', s)
	}
	await goto(`/search?${$page.url.searchParams.toString()}`)
	await invalidate()
}

export async function refreshData() {
	await invalidate()
	// try {
	// 	const res = await getAPI(`products?${data.query.toString()}`)

	// 	// console.log('refresh res = ', res)

	// 	data.products = res?.data
	// 	data.count = res?.count
	// 	data.facets = res?.facets?.all_aggs
	// 	data.err = !data.products ? 'No result Not Found' : null
	// } catch (e) {
	// 	toast(e, 'error')
	// } finally {
	// }
}

export function handleParent(m, mx) {
	if (showChild[mx] === true) {
		return
	} else if (showChild[mx] === false) {
		showChild[mx] = undefined
	} else {
		goto(`/${m.slug}`)
	}
}

export function toggle(mx) {
	if (showChild[mx] === true) {
		showChild[mx] = false
	} else {
		showChild[mx] = true
	}
}