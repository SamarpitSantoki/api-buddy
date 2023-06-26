const {Resend} = require('resend');


const resend = new Resend('re_Wy3RYXDT_Gn731hVVbq4qZHao4xirzppg');

resend.emails.send({
  from: 'support@apibuddy.samarpit.dev',
  to: 'samarpit.santoki@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});