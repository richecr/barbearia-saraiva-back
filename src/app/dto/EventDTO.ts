import * as yup from 'yup';

export const EventCreate = yup.object().shape({
    user_id: yup.number().nullable().notRequired(),
    schedule_id: yup.number().required("O campo barbeiro é obrigatório!"),
    date_hour_start: yup.date().required("O campo de data de início é obrigatório!"),
    type_service: yup.number().required("O campo tipo do serviço é obrigatório!"),
});

export const EventUpdate = yup.object().shape({
    user_id: yup.number().nullable().notRequired(),
    schedule_id: yup.number(),
    date_hour_start: yup.date(),
    type_service: yup.string()
});

export const EventUpdateAndDelete = yup.object().shape({
    id: yup.number().required("O id não foi enviado!"),
});
