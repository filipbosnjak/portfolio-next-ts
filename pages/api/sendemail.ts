// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Message} from "@/types/types";
import sgMail from "@sendgrid/mail"

type Data = {
  message: string
  error: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const message: Message = JSON.parse(req.body)
    console.log(message.to)

    sgMail.setApiKey('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');
    const msg = {
        to: 'filip.bosnajk25@gmail.com', // Change to your recipient
        from: message.to, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
/*    sgMail
        .send(msg)
        .then((res) => {
            console.log(res)
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })*/
}
