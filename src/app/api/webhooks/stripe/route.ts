import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    // Tạo order trong DB (bạn có thể mở rộng thêm)
    const order = await prisma.order.create({
      data: {
        email: session.customer_email!,
        total: session.amount_total! / 100,
        stripeId: session.id,
        status: 'PAID',
      },
    })
    await sendOrderConfirmationEmail(order)
  }

  return NextResponse.json({ received: true })
}