import { resolve } from 'path';
import nodemailer from 'nodemailer';
import { create } from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import mailConfig from './emailConfig';
import moment from 'moment';

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
                    helpers: {
                        timeConvert: (duration: number) => {
                            const num = duration;
                            const hours = (num / 60);
                            const rhours = Math.floor(hours);
                            const minutes = (hours - rhours) * 60;
                            const rminutes = Math.round(minutes);
                            return rhours + " hora(s) e " + rminutes + " minutos(s).";
                        },
                        formatDate: (date: Date) => {
                            return moment(date).utcOffset("+0000").format("DD-MM-YYYY HH:mm:ss");
                        },
                        isArrayEmpty: (array: []) => {
                            return array.length === 0;
                        }
                    },
                    handlebars: allowInsecurePrototypeAccess(Handlebars),
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