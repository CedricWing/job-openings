import React from 'react';
import cn from 'classnames';
import { Position } from '@common/utils/types';
import DynamicCheckBox from '../../components/DynamicCheckBox';
import DynamicForm from '../../components/DynamicForm';
import PositionSection from './position';
import DynamicModal from '../../components/DynamicModal';

type Props = {
  index: number;
  team: { name: string; jobs: Position[]; active: boolean };
  toggleTeamOpenings: (teamName: string, checked: boolean) => void;
  toggleTeamCollapse: (teamName: string) => void;
  togglePositionOpenings: (teamName: string, name: string) => void;
  insertNewPosition: (teamName: string, position: Position) => void;
  updateTeamName: (initialName: string, newName: string) => void;
  updatePosition: (
    teamName: string,
    initialName: string,
    position: Position,
  ) => void;
};
const TeamSection = (props: Props) => {
  const { team, index } = props;
  const count = team.jobs
    .filter((job) => job.active)
    .reduce((a, b) => a + b.count, 0);
  const teamChecked = count !== 0;
  return (
    <div key={index} className="accordion-item p-4">
      <h2 className="accordion-header" id={`heading${index}`}>
        <div className="team-card">
          <DynamicCheckBox
            label={team.name}
            value={count}
            checked={teamChecked}
            onChange={() => {
              props.toggleTeamOpenings(team.name, teamChecked);
            }}
          />
          <span className="team-card-btn-group d-flex align-items-center justify-content-between">
            <DynamicModal
              id={`${index}`}
              value={{ name: team.name, count: 0, active: false }}
              callback={(data) => {
                props.updateTeamName(data.initialName, data.position.name);
              }}
              muteCount
            />
            <button
              className={cn('accordion-button', {
                collapsed: !team.active,
              })}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded={team.active ? 'true' : 'false'}
              aria-controls={`collapse${index}`}
              onClick={() => {
                props.toggleTeamCollapse(team.name);
              }}
            />
          </span>
        </div>
      </h2>
      <div
        id={`collapse${index}`}
        className={cn('accordion-collapse collapse', {
          show: team.active,
        })}
        aria-labelledby={`heading${index}`}
      >
        <div className="accordion-body">
          <ul className="list-group">
            {team.jobs.map((position, subIndex) => (
              <PositionSection
                key={`${index}-${subIndex}`}
                index={`${index}-${subIndex}`}
                teamName={team.name}
                position={position}
                togglePositionOpenings={props.togglePositionOpenings}
                updatePosition={props.updatePosition}
              />
            ))}
            <DynamicForm
              label={'Add new positions to the team'}
              callback={(data) => {
                props.insertNewPosition(team.name, { ...data, active: false });
              }}
              values={team.jobs.map((job) => job.name)}
              placeholder={'New position name'}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TeamSection;
