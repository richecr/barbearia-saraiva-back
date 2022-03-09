import * as yup from 'yup';

export const UserCreate = yup.object().shape({
    name: yup.string().required("O campo nome é obrigatório!"),
    email: yup.string().email().required("O campo email é obrigatório!"),
    birthday: yup.date().required("O campo data de aniversário é obrigatório!"),
    password: yup.string().required("O campo senha é obrigatório!"),
    telephone: yup.string().required("O campo telefone é obrigatório!"),
    notification_email: yup.boolean().required("O campo notificação por e-mail é obrigatório!"),
    notification_whatsapp: yup.boolean().required("O campo notificação pelo whatsapp é obrigatório!"),
});

export const UserUpdate = yup.object().shape({
    name: yup.string().required("O campo nome é obrigatório!"),
    email: yup.string().email().required("O campo email é obrigatório!"),
    birthday: yup.date().required("O campo data de aniversário é obrigatório!"),
    password: yup.string().required("O campo senha é obrigatório!"),
    telephone: yup.string().required("O campo telefone é obrigatório!"),
    notification_email: yup.boolean().required("O campo notificação por e-mail é obrigatório!"),
    notification_whatsapp: yup.boolean().required("O campo notificação pelo whatsapp é obrigatório!"),
});

export const UserUpdateAndDelete = yup.object().shape({
    id: yup.number().required("O ID não foi enviado!"),
});
