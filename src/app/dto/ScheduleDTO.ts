import * as yup from 'yup';

export const ScheduleCreate = yup.object().shape({
    barber_name: yup.string().required("O campo nome do barbeiro é obrigatório!"),
    barber_telephone: yup.string().required("O campo telefone do barbeiro é obrigatório!"),
    email: yup.string().email().required("O campo email do barbeiro é obrigatório!"),
});

export const ScheduleUpdate = yup.object().shape({
    barber_name: yup.string().required("O campo nome do barbeiro é obrigatório!"),
    barber_telephone: yup.string().required("O campo telefone do barbeiro é obrigatório!"),
    email: yup.string().email().required("O campo email do barbeiro é obrigatório!"),
});

export const ScheduleUpdateAndDelete = yup.object().shape({
    id: yup.number().required("O ID não foi enviado!"),
});
