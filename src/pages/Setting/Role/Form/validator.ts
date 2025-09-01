import {
  object,
  string
} from 'yup';

const validation = object().shape({
  name: string().required('Name is required')
});

export { validation };