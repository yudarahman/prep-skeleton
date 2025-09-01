import {
  array,
  object,
  string
} from 'yup';

import { ACTION } from '@/constants/action';

const validation = (mode?: string) => object().shape({
  username: string().required('Username is required'),
  password: mode === ACTION.EDIT
    ? string()
    : string().required('Password is required'),
  fullname: string().required('Full Name is required'),
  email: string().email().required('Email is required'),
  userRoles: array().min(1, 'User Roles must be selected')
});

export { validation };