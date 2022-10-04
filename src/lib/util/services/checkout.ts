
import { toast } from '$lib/util'
import { post } from '$lib/util/api'

// Add Address Functions

export async function save(ads) {
	const id = data.ads.id || 'new'
	const {
		firstName,
		lastName,
		email,
		phone,
		address,
		locality,
		city,
		district,
		state,
		country,
		zip
	} = ads
	try {
		loading = true
		const { data, errors } = await post('addresses', {
			id,
			firstName,
			lastName,
			email,
			phone,
			address,
			locality,
			city,
			district,
			state,
			country,
			zip
		})
		goto(`/checkout/address`)
	} catch (e) {
		toast(err, 'error')
		err = e
	} finally {
		loading = false
	}
}


// Address Functions

export function addressChanged(detail) {
	// console.log('detail = ', detail)

	selectedAddress = detail.detail
}

export async function refreshAddress() {
	try {
		myAddresses = await getAPI('addresses/my')
		selectedAddress = myAddresses?.data[0]?._id
	} catch (e) {
		err = e
	} finally {
	}
}


// Payment Functions

export function paymentMethodChanged(pm) {
	selectedPaymentMethod = pm
	errorMessage = null
}

export async function submit(pm) {
	// console.log('pm = ', pm)

	if (!pm || pm === undefined) {
		disabled = true
		errorMessage = 'Please select a payment option'
		toast('Please select a payment option', 'error')
		return
	}

	const paymentMethod = pm.value

	if (paymentMethod === 'cod') {
		try {
			loading = true
			const res = await post('orders/checkout/cod', {
				address: addressId,
				paymentMethod: 'COD',
				prescription: prescription?._id
			})

			goto(`/payment/success?id=${res?._id}&status=PAYMENT_SUCCESS&provider=COD`)
		} catch (e) {
			toast(e, 'error')
		} finally {
			loading = false
		}
	} else if (paymentMethod === 'cashfree') {
		try {
			loading = true
			const res = await post(`payments/checkout-cf`, { address: addressId })
			if (res?.redirectUrl && res?.redirectUrl !== null) {
				goto(`${res?.redirectUrl}`)
			} else {
				toast('Something went wrong', 'error')
			}
		} catch (e) {
			toast(e?.message, 'error')
		} finally {
			loading = false
		}
	} else if (paymentMethod === 'razorpay') {
		try {
			const rp = await post(`payments/checkout-rp`, {
				address: addressId
			})

			// console.log('rp = ', rp)

			const options = {
				key: rp.keyId, // Enter the Key ID generated from the Dashboard
				name: 'kitcommerce.tech',
				description: 'Payment for Misiki',
				image: '/icon.png',
				amount: rp.amount,
				order_id: rp.id,
				async handler(response) {
					// console.log('response = ', response)

					try {
						const capture = await post(`payments/capture-rp`, {
							rpPaymentId: response.razorpay_payment_id,
							rpOrderId: response.razorpay_order_id
						})

						// console.log('capture = ', capture)

						toast('Payment success', 'success')
						goto(`/payment/success?id=${capture._id}`)
					} catch (e) {
						// toast(e, 'error')
						goto(`/payment/failure?ref=/checkout/payment-options?address=${addressId}`)
					} finally {
					}
				},
				prefill: {
					name: `${me.firstName} ${me.lastName}`,
					phone: me.phone,
					email: me.email || 'help@kitcommerce.tech',
					contact: me.phone
				},
				notes: {
					address: '#22, Global Village, Rourkela, Odisha-769002, India'
				},
				theme: {
					color: '#112D4E'
				}
			}

			const rzp1 = new Razorpay(options)
			rzp1.open()
		} catch (e) {
			toast(e?.message, 'error')
		} finally {
			loading = false
		}
	} else {
		paymentDenied = true

		setTimeout(() => {
			paymentDenied = false
		}, 820)
	}
}

export function checkIfStripeCardValid({ detail }) {
	disabled = !detail
}