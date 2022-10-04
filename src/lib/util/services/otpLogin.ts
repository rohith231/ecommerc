import { goto, invalidate } from '$app/navigation'
import { post } from '$lib/util/api'
import { browser } from '$app/environment'
import { page } from '$app/stores'
import { toast } from '$lib/util'
import Cookie from 'cookie-universal'

const cookies = Cookie()


let phone,
	loading = false,
	otpRequestSend = false,
	resendAfter = 0

export async function handleSendOTP({ detail }) {
	phone = detail
	try {
		loading = true
		const data = await post('get-otp', { phone })
		resendAfter = data?.timer
		otpRequestSend = true
	} catch (e) {
		toast(e, 'error')
	} finally {
		loading = false
	}
}

export async function handleVerifyOtp({ detail }) {
	try {
		loading = true
		const otp = detail
		const data = await post('verify-otp', { phone, otp })
		const me = {
			email: data.email,
			phone: data.phone,
			firstName: data.firstName,
			lastName: data.lastName,
			avatar: data.avatar,
			role: data.role,
			verified: data.verified,
			active: data.active
		}
		await cookies.set('me', me, { path: '/' })
		// $page.data.me = me
		await invalidate()
		let r = data.ref || '/'
		if (browser) goto(r)
	} catch (e) {
		toast(e, 'error')
	} finally {
		loading = false
	}
}

export function changeNumber() {
	phone = ''
	otpRequestSend = false
}