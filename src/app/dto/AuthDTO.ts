import * as yup from 'yup';

const SessionCreate = yup.object().shape({
    email: yup.string().email("E-mail digitado é incorreto!").required("O campo e-mail é obrigatório!"),
    password: yup.string().required("O campo senha é obrigatório!"),
});

export default SessionCreate;