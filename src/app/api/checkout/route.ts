import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

interface CartItem {
  productId: string
  quantity: number
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { items, email } = await req.json() as { items: CartItem[]; email: string }

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i: CartItem) => i.productId) } },
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: CartItem) => {
      const product = products.find(p => p.id === item.productId)!
      return {
        price_data: {
          currency: 'vnd',
          product_data: { name: product.name },
          unit_amount: Number(product.price) * 100, // Stripe dùng đơn vị nhỏ nhất
        },
        quantity: item.quantity,
      }
    }),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    customer_email: email,
  })

  return NextResponse.json({ url: session.url })
}