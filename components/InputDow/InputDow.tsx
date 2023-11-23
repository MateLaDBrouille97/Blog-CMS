import { FC, SelectHTMLAttributes } from "react";
import React, { ChangeEvent } from "react";
import { Priority } from "@prisma/client";


interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value: Priority;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>)=> void;
}

const InputDow: FC<Props> = (props) => {
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
        className="block my-3 text-sm font-medium text-gray-900 mx-2"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        {...restProps}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
      >
        <option selected>Choose a Priority</option>
        <option value={Priority.LOW}>Low</option>
        <option value={Priority.MEDIUM}>Medium</option>
        <option value={Priority.HIGH}>High</option>
      </select>
    </div>
  );
};

export default InputDow;
