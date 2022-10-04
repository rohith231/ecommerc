
import { date, currency, delay, toast } from '$lib/util'
import { goto, invalidate } from '$app/navigation';
import { post } from '../api';

let loading
let cartButtonText
let bounceItemFromTop

export async function addToBag(p) {
	loading = true
	cartButtonText = 'Adding...'

	try {
		await post('carts/add-to-cart', {
			pid: p._id,
			vid: p._id,
			qty: 1,
			options: p.options
		})

		await invalidate()
		cartButtonText = 'Go to cart'

		// const res = await getAPI('carts/my')

		// if (res) {
		// 	const cookieCart = {
		// 		items: res?.items,
		// 		qty: res?.qty,
		// 		tax: res?.tax,
		// 		subtotal: res?.subtotal,
		// 		total: res?.total,
		// 		currencySymbol: res?.currencySymbol,
		// 		discount: res?.discount,
		// 		selfTakeout: res?.selfTakeout,
		// 		shipping: res?.shipping,
		// 		unavailableItems: res?.unavailableItems,
		// 		formattedAmount: res?.formattedAmount
		// 	}
		// 	await cookies.set('cart', cookieCart, { path: '/' })
		// 	$page.data.cart = cookieCart
		// 	cartButtonText = 'Added To Cart'
		// 	bounceItemFromTop = true
		// }
	} catch (e) {
		cartButtonText = 'Error Add To Cart'
	} finally {
		loading = false
		await delay(5000)
		cartButtonText = 'Add to bag'
		bounceItemFromTop = false
	}
}