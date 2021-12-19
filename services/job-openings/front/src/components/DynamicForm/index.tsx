import React from 'react';
import cn from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../../styles/components/index.scss';

const schemaValidation = yup.object().shape({
  name: yup.string().required('A name is required'),
  count: yup
    .number()
    .min(0, 'Invalid number - minimum 0')
    .optional()
    .typeError('Invalid number - minimum 0'),
});
type FormData = {
  name: string;
  count: number;
};
type Props = {
  callback: (data: { name: string; count: number }) => void;
  values: Array<string>;
  label: string;
  muteCount?: boolean;
  placeholder: string;
};
const DynamicForm = (props: Props) => {
  const { handleSubmit, formState, register, setError } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });
  const onFormSubmit = handleSubmit(async (data) => {
    if (props.values.includes(data.name)) {
      setError('name', {
        type: 'name',
        message: 'Name must be unique!',
      });
      return;
    }
    props.callback(data);
  });
  return (
    <>
      <span
        className={cn(' me-2 font-bold fw-bold mb-2', {
          'text-black mt-5': !props.muteCount,
          'text-white': props.muteCount,
        })}
      >
        {props.label}
      </span>
      <li
        className={cn('list-form-group text-start d-flex align-items-start', {
          'mb-3': props.muteCount,
          'list-form-group': !props.muteCount,
        })}
      >
        <div className="form-input-name">
          <input
            className={cn('form-control', {
              'is-invalid': formState.errors.name,
            })}
            placeholder={props.placeholder}
            {...register('name')}
            name="name"
            type="name"
          />
          <div className="invalid-feedback">
            {formState.errors.name?.message}
          </div>
        </div>

        {!props.muteCount && (
          <div className="form-input-count">
            <input
              className={cn('form-control me-5', {
                'is-invalid': formState.errors.count,
              })}
              placeholder="Count"
              {...register('count')}
              name="count"
              type="count"
            />
            <div className="invalid-feedback">
              {formState.errors.count?.message}
            </div>
          </div>
        )}

        <button
          className={cn(' btn btn-primary form-input-btn', {
            'form-input-btn': !props.muteCount,
          })}
          onClick={onFormSubmit}
        >
          + Add New
        </button>
      </li>
    </>
  );
};

export default DynamicForm;
