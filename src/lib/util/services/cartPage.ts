import { post, getAPI, del } from '$lib/util/api';
import { error, redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import { goto, invalidate } from '$app/navigation';
import { currency, date } from '$lib/util';
import cookie from 'cookie';


export let data

let coupons
let products = []
let loading = {}
let openApplyPromoCodeModal = false
let loadingProducts = false
let loadingCoupon = false
let selectedCouponCode = ''
let loadingApplyCoupon = false
let appliedCouponInfo = {}
let loadingRemoveCoupon = false
let couponErr


export const addToCart = async ({ pid, vid, qty, options, ix }: any) => {
	loading[ix] = true
	const res = await post('carts/add-to-cart', {
		pid,
		vid,
		qty,
		options
	})
	// cart = res
	// $page.data.cart = res
	// await refreshCart()
	await invalidate()
	loading[ix] = false
}

export function handleCouponCode(couponCode: string) {
	selectedCouponCode = couponCode
	applyCouponCode(selectedCouponCode)
}

export async function applyCouponCode(selectedCouponCode: string) {
	try {
		loadingApplyCoupon = true
		const resAC = await post('apply-coupon', { code: selectedCouponCode })
		appliedCouponInfo = resAC
		await invalidate()
		// await refreshCart()
		openApplyPromoCodeModal = false
	} catch (e) {
		couponErr = e
	} finally {
		loadingApplyCoupon = false
	}
}

export async function removeCouponCode() {
	try {
		loadingRemoveCoupon = true
		await del('remove-coupon')
		selectedCouponCode = ''
		await invalidate()
		await refreshCart()
	} catch (e) {
		couponErr = e
	} finally {
		loadingRemoveCoupon = false
	}
}

export async function getProducts() {
	try {
		loadingProducts = true
		const resP = await getAPI(`es/products?store=${$page.data?.store?.id}`)
		products = resP?.hits
	} catch (e) {
	} finally {
		loadingProducts = false
	}
}

export async function getCoupons() {
	try {
		loadingCoupon = true
		const resC = await getAPI(`coupons?store=${$page.data?.store?.id}`)
		coupons = resC?.data

		// console.log('coupons = ', coupons)
	} catch (e) {
	} finally {
		loadingCoupon = false
	}
}

export async function refreshCart() {
	try {
		const res = await getAPI('carts/refresh-cart')
		if (res) {
			const cookieCart = {
				items: res?.items,
				qty: +res?.qty,
				tax: +res?.tax,
				subtotal: +res?.subtotal,
				total: +res?.total,
				currencySymbol: res?.currencySymbol,
				discount: res?.discount,
				selfTakeout: res?.selfTakeout,
				shipping: res?.shipping,
				unavailableItems: res?.unavailableItems,
				formattedAmount: res?.formattedAmount
			}
			const str = cookie.serialize('cart', JSON.stringify(cookieCart), { path: '/' })

			console.log('zzzzzzzzzzzzzzzzzzcookieCart', cookieCart)

			data.cart = cookieCart
		}
	} catch (e) {
	} finally {
	}
}