import React from 'react';
import { Position } from '@common/utils/types';
import DynamicCheckBox from '../../components/DynamicCheckBox';
import DynamicModal from '../../components/DynamicModal';
// Contains job position relevant components
type Props = {
  index: string;
  teamName: string;
  position: Position;
  togglePositionOpenings: (teamName: string, name: string) => void;
  updatePosition: (
    teamName: string,
    initialName: string,
    position: Position,
  ) => void;
};

const PositionSection = (props: Props) => {
  const { position, teamName, index, togglePositionOpenings } = props;
  return (
    <li
      key={index}
      className="list-group-item text-end d-flex justify-content-between"
    >
      <DynamicCheckBox
        label={position.name}
        value={position.count}
        checked={position.active}
        onChange={() => {
          togglePositionOpenings(teamName, position.name);
        }}
      />
      <DynamicModal
        id={`${index}`}
        value={position}
        callback={(data) => {
          props.updatePosition(teamName, data.initialName, data.position);
        }}
      />
    </li>
  );
};
export default PositionSection;
