
import { post } from '$lib/util/api'

import { goto } from '$app/navigation'



let loadingForWishlist
let isWislisted

let loginPath = '/auth/otp-login'


export async function toggleWishlist(id) {
	try {
		loadingForWishlist = true
		isWislisted = await post(`wishlists/toggle`, { product: id, variant: id })
	} catch (e) {
		if (e.message === 'You must be logged in') {
			const url = '/'
			goto(`${loginPath}?ref=${url}`)
		}
	} finally {
		loadingForWishlist = false
	}
}