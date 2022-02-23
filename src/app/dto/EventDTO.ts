import * as yup from 'yup';

export const EventCreate = yup.object().shape({
    user_id: yup.number().required(),
    schedule_id: yup.number().required(),
    date_hour_start: yup.date().required(),
    date_hour_end: yup.date().required(),
    type_service: yup.string().required(),
    duration_service: yup.number().required()
});

export const EventUpdate = yup.object().shape({
    user_id: yup.number(),
    schedule_id: yup.number(),
    date_hour_start: yup.date(),
    date_hour_end: yup.date(),
    type_service: yup.string(),
    duration_service: yup.number()
});

export const EventUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
