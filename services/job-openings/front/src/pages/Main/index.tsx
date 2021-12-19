import React from 'react';
import CatLoader from '../../components/Loading';
import { useJobOpenings } from '../../lib/jobOpenings';
import TeamSection from './team';
import DynamicForm from '../../components/DynamicForm';
import '../../styles/pages/index.scss';
// Contains the main page of the application - holds the other components with some global actions available
const Main = () => {
  const jobOpeningsHook = useJobOpenings();
  const { data, loading, resetJobOpenings, saveJobOpenings } = jobOpeningsHook;
  return (
    <div className="bg">
      <div className="container-lg">
        <div className="main-title-text text-white p-4 ps-0">JOB OPENINGS</div>
        {loading || (data && data.length === 0) ? (
          <CatLoader />
        ) : (
          <>
            <DynamicForm
              label={'Add a new team'}
              callback={(formData) => {
                jobOpeningsHook.insertNewTeam(formData.name);
              }}
              values={data.map((team) => team.name)}
              placeholder={'New team name'}
              muteCount
            />
            <div className="accordion" id="jobsAccordion">
              {data.map((team, index) => (
                <TeamSection
                  key={index}
                  index={index}
                  team={team}
                  {...jobOpeningsHook}
                />
              ))}
            </div>
            <div className="d-flex global-btn-group">
              <button
                className="global-btn btn btn-outline-warning"
                onClick={resetJobOpenings}
              >
                Reset
              </button>
              <button
                className="global-btn  btn btn-success"
                onClick={saveJobOpenings}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Main;
