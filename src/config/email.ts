import { resolve } from 'path';
import nodemailer from 'nodemailer';
import { create } from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import mailConfig from './emailConfig';

class Mail {
    private transporter: nodemailer.Transporter;

    constructor() {
        const { host, port, secure, auth } = mailConfig;
        this.transporter = nodemailer.createTransport({
            host: host,
            port: Number(port),
            secure,
            auth: auth
        });

        this.configureTemplates();
    }

    configureTemplates() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    
        this.transporter.use(
            'compile',
            nodemailerhbs({
                viewEngine: create({
                    layoutsDir: resolve(viewPath, 'layouts'),
                    partialsDir: resolve(viewPath, 'partials'),
                    defaultLayout: 'default',
                    extname: '.hbs',
                }),
                viewPath,
                extName: '.hbs',
            })
        );
    }

    async sendEmail(message: any) {
        return this.transporter.sendMail({ ...message});
    }
}

export default new Mail();