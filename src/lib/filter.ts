import {
  chain,
  isEmpty,
  isObject
} from 'lodash';

const generateFilter = (data: Record<string, unknown>, op?: string) => {
  let stringFilter = '';
  
  Object
    .keys(data)
    .forEach((key) => {
      switch (true) {
        case Array.isArray(data[key]): {
          const result = (!isEmpty(data[key]) && isObject(data[key][0]))
            ? chain(data[key])
              .map('value')
            // `compact` will eliminate `false` or `0`
            // API needs `false` or `0` value
              .filter((value) => value !== null && value !== undefined && value !== '' && !Number.isNaN(value))
              .join('|')
              .value()
            : chain(data[key])
              .filter((value) => value !== null && value !== undefined && value !== '' && !Number.isNaN(value))
              .join('|')
              .value();

          stringFilter += `${key}${op || '=='}${result},`;
          break;
        }
        default: {
          const result = (!isEmpty(data[key]) && isObject(data[key]))
            ? (data[key] as { [key: string]: unknown }).value
            : data[key];

          stringFilter += `${key}${op || '=='}${result},`;
          break;
        }
      }
    });

  return stringFilter;
};

export { generateFilter };