import { DATABASE_KEY } from '@/constants/database';
import { DatabaseConflictError } from '@/constants/errors';

import Database from './base';

const initialState = {
  limits: [5, 10, 20, 30, 50],
  currentPage: 1,
  pageSize: 10,
  search: '',
  sortBy: ''
};

const generateTableSeeder = async () => {
  const db = new Database();

  try {
    await db.putData({
      _id: DATABASE_KEY.TABLE,
      value: initialState
    });
  } catch (err) {
    throw new DatabaseConflictError();
  }
};

export { generateTableSeeder };