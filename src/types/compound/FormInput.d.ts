import { LucideIcon } from 'lucide-react';

type CmFormInputProps = {
  disabled?: boolean;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  className?: string;
};

type CmFormInputWithIconProps = {
  isIconBefore?: boolean;
  disabled?: boolean;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  icon?: LucideIcon;
  className?: string;
  onIconClick?: () => void;
};