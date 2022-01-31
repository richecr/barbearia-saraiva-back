import * as yup from 'yup';

const SessionCreate = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});

export default SessionCreate;