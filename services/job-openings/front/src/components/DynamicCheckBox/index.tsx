import React from 'react';
import '../../styles/components/index.scss';

type Props = {
  label: string;
  checked: boolean;
  value: number;
  onChange: () => void;
};
const DynamicCheckBox = (props: Props) => {
  const { label, value, checked, onChange } = props;
  return (
    <span className="d-flex align-items-center form-check-group">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        checked={checked}
        style={{ cursor: 'pointer' }}
        onChange={onChange}
      />
      <span className="form-check-label-group">
        <span className="form-check-text">{label}</span>
        <span className="form-check-count">{value}</span>
      </span>
    </span>
  );
};
export default DynamicCheckBox;
