import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  isEmpty,
  isUndefined
} from 'lodash';

import {
  ERROR_TOAST_CODE,
  ERROR_TOAST_DESCRIPTION,
  ERROR_TOAST_TITLE
} from '@/constants/errors';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const transformError = (error?: FetchBaseQueryError | SerializedError) => {
  if (isUndefined(error) || isEmpty((error as FetchBaseQueryError).data)) {
    return '[0] Unknown Error';
  }

  const { data } = error as FetchBaseQueryError;
  const errorData = data as {
    code: number,
    status: number,
    statusType: string,
    title: string,
    message: string
  };

  return `[${errorData?.code}] ${errorData?.message}`;
};

const getErrorDetail = (error?: FetchBaseQueryError | SerializedError) => {
  if (isUndefined(error) || isEmpty((error as FetchBaseQueryError).data)) {
    return {
      code: 0,
      status: 0,
      statusType: 'Unknown',
      title: 'Unknown',
      message: 'Unknown'
    };
  }

  const { data } = error as FetchBaseQueryError;
  return data as {
    code: number,
    status: number,
    statusType: string,
    title: string,
    message: string
  };
};

const getInitials = (name?: string) => {
  if (isUndefined(name)) {
    return '';
  }

  return name
    .split(' ')
    .map((splitName) => splitName.charAt(0).toUpperCase())
    .join('');
};

const generateSuccessToast = (
  data?: ABaseSuccessResponse,
  dataType?: string,
  type?: string
) => {
  if (!isEmpty(data)) {
    return {
      title: `[${data?.code}] ${data?.title}`,
      description: data?.message
    };
  }
  
  return {
    title: '[200] Success!',
    description: `${dataType || 'Unknown'} has been ${type || 'unknown'}`
  };
};

const generateErrorToast = (
  error?: FetchBaseQueryError
    | SerializedError
    | ABaseErrorResponse
) => {
  if (!isUndefined(error)) {
    if ((error as { data: string }).data) {
      return {
        title: `[${ERROR_TOAST_CODE.UNKNOWN}] ${ERROR_TOAST_TITLE.ERROR}`,
        description: ERROR_TOAST_DESCRIPTION.UNKNOWN
      };
    }
    
    const {
      code,
      title,
      message
    } = error as ABaseErrorResponse;
    
    return {
      title: `[${code}] ${title}`,
      description: message
    };
  }
  
  return {
    title: `[${ERROR_TOAST_CODE.UNKNOWN}] ${ERROR_TOAST_TITLE.ERROR}`,
    description: ERROR_TOAST_DESCRIPTION.UNKNOWN
  };
};

export {
  cn,
  transformError,
  getErrorDetail,
  getInitials,
  generateSuccessToast,
  generateErrorToast
};