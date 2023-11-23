import { ChangeEvent, FC, FormEvent } from 'react';
import { MdCancel } from 'react-icons/md';

import Input from '../Input/Input';

interface ProjectFormProps {
  isVisible: boolean;
  toggleProjectForm: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formData: { name: string; description: string };
  isCreateProject: boolean;
  isEditProject: boolean;
}

const DeleteForm: FC<ProjectFormProps> = props => {
  const {
    isVisible,
    toggleProjectForm,
    handleSubmit,
    onChange,
    formData,
    isCreateProject,
    isEditProject,
  } = props;

  return (
    <div
      className={`absolute w-80 z-[55] bg-white rounded-lg shadow ${
        isVisible
          ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700'
          : '-translate-y-[150%] left-1/2 -translate-x-1/2'
      }`}
    >
      <button
        type='button'
        className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center'
      >
        <MdCancel onClick={toggleProjectForm} className='text-3xl' />
      </button>

      <div className='px-6 py-6 lg:px-8'>
        <h3 className='mb-4 text-xl font-medium text-gray-900'>Are you sure you want to delete the Project ?</h3>
        <form className='space-y-6' onSubmit={handleSubmit}>
       

          <button
           
            type='submit'
            className='w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            {/* {isCreateProject
              ? 'CREATING...'
              : isEditProject
              ? 'EDIT'
              : 'CREATE'} */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteForm;