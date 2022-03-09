import * as yup from 'yup';

export const EventTimeCreate = yup.object().shape({
    event_name: yup.string().required("O campo nome do evento é obrigatório!"),
    duration: yup.number().required("O campo duração é obrigatório!"),
});

export const EventTimeUpdate = yup.object().shape({
    event_name: yup.string(),
    duration: yup.number(),
});

export const EventTimeUpdateAndDelete = yup.object().shape({
    id: yup.number().required("O ID não foi enviado!"),
});
