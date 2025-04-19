// Razorpay integration module

// Live API keys
export const RAZORPAY_KEY_ID = "rzp_live_9nKLTv0cg57KBO"
export const RAZORPAY_KEY_SECRET = "BwKNMFfuGIoqkVvclAvD63rl"

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Initialize Razorpay payment
export const initializeRazorpayPayment = async (options: any): Promise<any> => {
  const res = await loadRazorpayScript()

  if (!res) {
    alert("Razorpay SDK failed to load. Please check your internet connection.")
    return
  }

  // Create a new instance of Razorpay
  const razorpay = new (window as any).Razorpay(options)
  razorpay.open()

  return razorpay
}

// Create payment options
export const createPaymentOptions = (
  amount: number,
  currency: string,
  name: string,
  description: string,
  orderId: string,
  email: string,
  contact: string,
  successCallback: (response: any) => void,
) => {
  return {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100, // Razorpay expects amount in paise
    currency,
    name,
    description,
    order_id: orderId,
    handler: successCallback,
    prefill: {
      name,
      email,
      contact,
    },
    notes: {
      address: "BLACKENSYS Corporate Office",
    },
    theme: {
      color: "#000000",
    },
  }
}

// Create order
export const createOrder = async (amount: number, currency = "INR"): Promise<string> => {
  try {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to create order")
    }

    return data.orderId
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

// Verify payment
export const verifyPayment = async (paymentId: string, orderId: string, signature: string): Promise<boolean> => {
  try {
    const response = await fetch("/api/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId,
        orderId,
        signature,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to verify payment")
    }

    return data.verified
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw error
  }
}
