import React, { useReducer } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { Position } from '@common/utils/types';
import PencilIcon from '../../assets/images/pencil-icon.svg';

const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  count: yup.number().optional(),
});
type FormData = {
  name: string;
  count: number;
};
type Props = {
  id: string;
  value: Position;
  callback: (data: { initialName: string; position: Position }) => void;
  muteCount?: boolean;
};
const DynamicModal = (props: Props) => {
  const { value } = props;
  const { handleSubmit, formState, register } = useForm<FormData>({
    resolver: yupResolver(schemaValidation),
  });
  const onFormSubmit = handleSubmit(async (data) => {
    props.callback({
      initialName: value.name,
      position: { ...data, active: value.active },
    });
  });

  const [position, updatePosition] = useReducer(
    (oldPosition: Position, newPosition: Partial<Position>) => ({
      ...oldPosition,
      ...newPosition,
    }),
    value,
  );
  const MODAL_ID = `modify-modal-${props.id}`;
  const custom = { tabIndex: -1 };
  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-secondary modal-btn"
        data-bs-toggle="modal"
        data-bs-target={`#${MODAL_ID}`}
      >
        <img className="edit-icon" src={PencilIcon} alt="pencil icon"></img>
      </button>
      <div
        className="modal fade"
        id={`${MODAL_ID}`}
        role="dialog"
        aria-hidden="true"
        {...custom}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body text-start">
              <label className="modal-name-label">Name</label>
              <input
                className={cn('form-control me-5 w-50', {
                  'is-invalid': formState.errors.name,
                })}
                {...register('name')}
                name="name"
                type="name"
                value={position.name}
                onChange={(event) => {
                  updatePosition({ ...position, name: event?.target.value });
                }}
              />
              <div className="invalid-feedback">
                {formState.errors.name?.message}
              </div>
              {props.muteCount == null && (
                <>
                  <label className="modal-name-label">Count</label>
                  <input
                    className={cn('form-control me-5 w-50', {
                      'is-invalid': formState.errors.count,
                    })}
                    {...register('count')}
                    name="count"
                    type="count"
                    value={position.count || ''}
                    onChange={(event) => {
                      updatePosition({
                        ...position,
                        count: Number(event?.target.value) || undefined,
                      });
                    }}
                  />
                  <div className="invalid-feedback">
                    {formState.errors.count?.message}
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={onFormSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DynamicModal;
