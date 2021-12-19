import { JobOpenings } from '@common/utils/types';
import { Request, Response } from 'express';
import defaultJobOpenings from '../assets/default.json';

// Mock fetch - data obtained from default json file
export const getDefaultJobOpenings = (__req: Request, res: Response) => {
  try {
    console.log(`Retrieving default job openings...`);
    const payload = defaultJobOpenings as { teams: JobOpenings };
    const polisedPayload = {
      teams: payload.teams.map((team) => ({
        ...team,
        active: false,
        jobs: team.jobs.map((job) => ({ ...job, active: false })),
      })),
    };
    console.log(`Retrieved ${JSON.stringify(polisedPayload)}`);
    return res.send(polisedPayload);
  } catch (error) {
    console.log('Unable to get default job openings: ', error);
    return res.sendStatus(500);
  }
};
