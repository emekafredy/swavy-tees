import mailer from '@sendgrid/mail';
import emailTemplate from './emailTemplate';

// eslint-disable-next-line import/prefer-default-export
export const sendOrderConfirmation = (name, orders, customerMail) => {
  mailer.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: customerMail,
    from: 'SwavyTees@turing.com',
    subject: 'Order Confirmation',
    text: 'Customer\'s order confirmation',
    html: emailTemplate.orderConfirmationTemplate(name, orders),
  };
  return mailer.send(msg);
};
