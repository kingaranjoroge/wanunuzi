const nodemailer = require('nodemailer');

class Mailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    generateHtml(text, links) {
        // Start with the plain text
        let html = `<p>${text}</p>`;

        // For each link, add a styled button
        for (let link of links) {
            html += `
        <a href="${link.url}" style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none;">
          ${link.text}
        </a>
      `;
        }

        return html;
    }

    async sendMail(from, to, subject, text, links = []) {
        // Generate the HTML
        let html = this.generateHtml(text, links);

        let mailOptions = {
            from,
            to,
            subject,
            html
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error while sending mail:', error);
            throw error;
        }
    }
}

module.exports = new Mailer();