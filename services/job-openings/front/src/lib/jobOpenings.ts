import { useEffect, useState } from 'react';
import { JobOpenings, Position } from '@common/utils/types';
import memoizee from 'memoizee';
import useApi from '../services/api';
import { useLoading } from './hooks';
import {
  insertNewTeamToOpenings,
  insertNewPositionToTeam,
  togglePositionActive,
  toggleTeamActive,
  toggleCollapse,
  updateTeamInOpenings,
  updatePositionInTeam,
} from './helpers';

const LOCAL_STORAGE_KEY = 'jobOpenings';
export const useJobOpenings = () => {
  const api = useApi();
  const [jobOpenings, setJobOpenings] = useState<JobOpenings>([]);
  // Here we load data from either local storage or make an api call
  const [loading, getJobOpenings] = useLoading(async (reset?: boolean) => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const data =
      localData && reset == null
        ? JSON.parse(localData)
        : await api.getDefaultJobOpenigns();
    setJobOpenings(data);
  }, true);
  const toggleTeamOpenings = memoizee((teamName: string, checked: boolean) => {
    const toSet = toggleTeamActive(jobOpenings, teamName, checked);
    setJobOpenings(toSet);
  });
  const togglePositionOpenings = memoizee((teamName: string, name: string) => {
    const toSet = togglePositionActive(jobOpenings, teamName, name);
    setJobOpenings(toSet);
  });
  const toggleTeamCollapse = memoizee((teamName: string) => {
    const toSet = toggleCollapse(jobOpenings, teamName);
    setJobOpenings(toSet);
  });

  const resetJobOpenings = memoizee(() => {
    getJobOpenings(true);
  });
  const saveJobOpenings = memoizee(() => {
    localStorage.clear();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobOpenings));
  });

  const insertNewTeam = memoizee((teamName: string) => {
    const toSet = insertNewTeamToOpenings(jobOpenings, teamName);
    setJobOpenings(toSet);
  });
  const insertNewPosition = memoizee((teamName: string, position: Position) => {
    const toSet = insertNewPositionToTeam(jobOpenings, teamName, position);
    setJobOpenings(toSet);
  });
  const updateTeamName = memoizee((initialName: string, newName: string) => {
    const toSet = updateTeamInOpenings(jobOpenings, initialName, newName);
    setJobOpenings(toSet);
  });
  const updatePosition = memoizee(
    (teamName: string, initialName: string, position: Position) => {
      const toSet = updatePositionInTeam(
        jobOpenings,
        teamName,
        initialName,
        position,
      );
      setJobOpenings(toSet);
    },
  );
  useEffect(() => {
    getJobOpenings();
  }, []);

  return {
    data: jobOpenings,
    loading,
    toggleTeamOpenings,
    togglePositionOpenings,
    resetJobOpenings,
    saveJobOpenings,
    toggleTeamCollapse,
    insertNewTeam,
    insertNewPosition,
    updateTeamName,
    updatePosition,
  };
};
