// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Message} from "@/types/types";
import sgMail from "@sendgrid/mail"
import * as process from "process";

type Data = {
  message: string
  error: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const message: Message = JSON.parse(req.body)

    sgMail.setApiKey(
        process.env.SEND_GRID_API_KEY as string
    );
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

    res.status(200).send({
        message: "okay",
        error: false
    })
}
