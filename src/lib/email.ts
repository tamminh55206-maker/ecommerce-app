import { Resend } from 'resend'
import { render } from '@react-email/render'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail(order: any) {
  // Bạn có thể tạo component email đẹp sau
  const html = `<h1>Xác nhận đơn hàng #${order.id}</h1><p>Cảm ơn bạn đã mua hàng!</p>`

  await resend.emails.send({
    from: 'Shop <orders@yourdomain.com>',
    to: order.email,
    subject: `Xác nhận đơn hàng #${order.id}`,
    html,
  })
}