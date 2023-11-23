import { ChangeEventHandler, FC, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<Props> = props => {
  const {
    label,
    name,
    onChange,
    placeholder,
    type,
    value,
    required,
    ...restProps
  } = props;

  return (
    <div>
      <label
        htmlFor={name}
        className='block my-3 text-sm font-medium text-gray-900 mx-2'
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className='indent-3  h-8 w-full rounded-sm'
        required={required}
        value={value}
        onChange={onChange}
        {...restProps}
      />
    </div>
  );
};

export default Input;