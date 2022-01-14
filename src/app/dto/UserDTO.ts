import * as yup from 'yup';

export const UserCreate = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    birthday: yup.date().required(),
    password: yup.string().required(),
    telephone: yup.string().required(),
    notification_email: yup.boolean().required(),
    notification_whatsapp: yup.boolean().required(),
});

export const UserUpdate = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    birthday: yup.date().required(),
    password: yup.string().required(),
    telephone: yup.string().required(),
    notification_email: yup.boolean().required(),
    notification_whatsapp: yup.boolean().required(),
});

export const UserUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
