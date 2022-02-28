import * as yup from 'yup';

export const EventTimeCreate = yup.object().shape({
    event_name: yup.string().required(),
    duration: yup.number().required(),
});

export const EventTimeUpdate = yup.object().shape({
    event_name: yup.string(),
    duration: yup.number(),
});

export const EventTimeUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
