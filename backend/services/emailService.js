const nodemailer = require('nodemailer');

async function sendMail({from,to,subject,text,html}) {
	let transporter = nodemailer.createTransport({
		host:process.env.SMTP_HOST,
		port:process.env.SMTP_PORT,
		secure:false,
		auth:{
			user:process.env.NODEMAILER_USER,
			pass:process.env.NODEMAILER_PASS
		}
	});

	let info = await transporter.sendMail({
		from: `TaskPro <${from}>`,
		to,
		subject,
		text,
		html
	});
	console.log(info)
}

module.exports = sendMail;