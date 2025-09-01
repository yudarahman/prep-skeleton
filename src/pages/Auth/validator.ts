import {
  object,
  string
} from 'yup';

const validation = object().shape({
  username: string().required('Username is required'),
  password: string().required('Password is required')
});

export { validation };