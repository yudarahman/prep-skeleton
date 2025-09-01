import {
  describe,
  expect,
  it
} from 'vitest';

import { validation } from '@/pages/Setting/Role/Form/validator';

describe('@/pages/Setting/Role/Form/validator.ts', () => {
  it('should resolve with expected value', async () => {
    const source = { name: 'Developer' };
    const result = validation.validate(source);
    
    await expect(result).resolves.toBeTruthy();
  });
  
  it('should reject with expected value', async () => {
    const source = { name: '' };
    const result = validation.validate(source);
      
    await expect(result).rejects.toThrow();
  });
});