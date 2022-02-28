import * as yup from 'yup';

export const EventCreate = yup.object().shape({
    schedule_id: yup.number().required(),
    date_hour_start: yup.date().required(),
    type_service: yup.string().required(),
});

export const EventUpdate = yup.object().shape({
    schedule_id: yup.number(),
    date_hour_start: yup.date(),
    type_service: yup.string()
});

export const EventUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
