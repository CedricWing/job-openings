import { Position, JobOpenings } from '@common/utils/types';

export const getItems = <T extends { name: string }>(
  items: T[],
  name: string,
) => {
  const index = items.findIndex((team) => team.name === name);
  return {
    item: items.find((team) => team.name === name),
    index: index >= 0 ? index : 0, // we insert in front if does not exist
    others: items.filter((team) => team.name !== name),
  };
};
export const toggleCollapse = (jobOpenings: JobOpenings, teamName: string) => {
  const { item, index, others } = getItems(jobOpenings, teamName);
  others.splice(index, 0, {
    name: item?.name || '',
    jobs: item?.jobs || [],
    active: !item?.active || false,
  });
  return others;
};
export const toggleTeamActive = (
  jobOpenings: JobOpenings,
  teamName: string,
  checked: boolean,
) => {
  const { item, index, others } = getItems(jobOpenings, teamName);
  others.splice(index, 0, {
    name: item?.name || '',
    active: item?.active || false,
    jobs: item?.jobs?.map((job) => ({ ...job, active: !checked })) || [],
  });
  return others;
};
export const togglePositionActive = (
  jobOpenings: JobOpenings,
  teamName: string,
  name: string,
) => {
  const teamsData = getItems(jobOpenings, teamName);
  const positionsData = getItems(teamsData.item?.jobs || [], name);
  const otherTeamData = positionsData.others;
  otherTeamData.splice(positionsData.index, 0, {
    name: positionsData.item?.name || '',
    count: positionsData.item?.count || 0,
    active: !positionsData.item?.active,
  });
  const otherJobsData = teamsData.others;
  otherJobsData.splice(teamsData.index, 0, {
    name: teamsData.item?.name || '',
    active: teamsData.item?.active || false,
    jobs: otherTeamData,
  });
  return otherJobsData;
};

export const insertNewPositionToTeam = (
  jobOpenings: JobOpenings,
  teamName: string,
  position: Position,
) => {
  const { item, index, others } = getItems(jobOpenings, teamName);
  others.splice(index, 0, {
    name: item?.name || '',
    active: item?.active || false,
    jobs: [...(item?.jobs || []), position],
  });
  return others;
};
export const insertNewTeamToOpenings = (
  jobopenings: JobOpenings,
  teamName: string,
) => [...jobopenings, { name: teamName, active: false, jobs: [] }];

export const updatePositionInTeam = (
  jobOpenings: JobOpenings,
  teamName: string,
  initialName: string,
  position: Position,
) => {
  const teamsData = getItems(jobOpenings, teamName);
  const positionsData = getItems(teamsData.item?.jobs || [], initialName);
  const otherTeamData = positionsData.others;
  otherTeamData.splice(positionsData.index, 0, {
    name: position.name || '',
    count: position.count || 0,
    active: position.active,
  });
  const otherJobsData = teamsData.others;
  otherJobsData.splice(teamsData.index, 0, {
    name: teamsData.item?.name || '',
    active: teamsData.item?.active || false,
    jobs: otherTeamData,
  });
  return otherJobsData;
};
export const updateTeamInOpenings = (
  jobOpenings: JobOpenings,
  initialName: string,
  name: string,
) => {
  const { item, index, others } = getItems(jobOpenings, initialName);
  others.splice(index, 0, {
    name: name || '',
    active: item?.active || false,
    jobs: item?.jobs || [],
  });
  return others;
};
