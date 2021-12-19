import { Express, Request, Response } from 'express';
import { getDefaultJobOpenings } from '../controllers/jobOpenings';
// Contains the routes of our server whose api to be consumed
const Routes = (router: Express) => {
  router.get('/', (__req: Request, res: Response) => {
    console.log(`This is the root url - server healthy`);
    res.sendStatus(200);
  });
  router.get('/api/default', getDefaultJobOpenings);
};
export default Routes;
