import * as yup from 'yup';

export const ScheduleCreate = yup.object().shape({
    baber_name: yup.string().required(),
    barber_telephone: yup.string().required(),
    email: yup.string().email().required(),
});

export const ScheduleUpdate = yup.object().shape({
    baber_name: yup.string().required(),
    barber_telephone: yup.string().required(),
    email: yup.string().email().required(),
});

export const ScheduleUpdateAndDelete = yup.object().shape({
    id: yup.number().required(),
});
