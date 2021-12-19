import {
  getItems,
  toggleCollapse,
  togglePositionActive,
  toggleTeamActive,
  insertNewPositionToTeam,
  insertNewTeamToOpenings,
  updateTeamInOpenings,
} from '../helpers';

const SAMPLE_JOB_OPENINGS = [
  {
    name: 'Dev Team',
    active: true,
    jobs: [
      {
        name: 'Web Engineer',
        count: 3,
        active: false,
      },
      {
        name: 'iOS Engineer',
        count: 1,
        active: false,
      },
    ],
  },
  {
    name: 'Product Team',
    active: false,
    jobs: [
      {
        name: 'UI Designer',
        count: 2,
        active: true,
      },
    ],
  },
  {
    name: 'Operation Team',
    active: false,
    jobs: [
      {
        name: 'Customer Success Manager',
        count: 3,
        active: false,
      },
    ],
  },
];
describe('lib-helpers-tests : getItems', () => {
  const SAMPLE_ARR = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
  it('should work on an empty list', () => {
    expect(getItems([], 'sample')).toEqual({
      item: undefined,
      index: 0,
      others: [],
    });
  });
  it('should find the item and filter the rest', () => {
    expect(getItems(SAMPLE_ARR, 'b')).toEqual({
      item: { name: 'b' },
      index: 1,
      others: [{ name: 'a' }, { name: 'c' }],
    });
  });
  it('should return undefine and filter the rest', () => {
    expect(getItems(SAMPLE_ARR, 'd')).toEqual({
      item: undefined,
      index: 0,
      others: SAMPLE_ARR,
    });
  });
});
describe('lib-helpers-tests : toggleCollapse', () => {
  it('should still work if item team does not exist', () => {
    expect(toggleCollapse(SAMPLE_JOB_OPENINGS, 'Unknown Team')).toEqual([
      { active: true, jobs: [], name: '' },
      ...SAMPLE_JOB_OPENINGS,
    ]);
  });
  it('should set active true if previous is false', () => {
    const caseArr = [...SAMPLE_JOB_OPENINGS];
    caseArr.pop();
    expect(toggleCollapse(SAMPLE_JOB_OPENINGS, 'Operation Team')).toEqual([
      ...caseArr,
      {
        name: 'Operation Team',
        active: true,
        jobs: [
          {
            name: 'Customer Success Manager',
            count: 3,
            active: false,
          },
        ],
      },
    ]);
  });
  it('should set active false if previous is true', () => {
    const caseArr = [...SAMPLE_JOB_OPENINGS];
    caseArr.shift();
    expect(toggleCollapse(SAMPLE_JOB_OPENINGS, 'Dev Team')).toEqual([
      {
        name: 'Dev Team',
        active: false,
        jobs: [
          {
            name: 'Web Engineer',
            count: 3,
            active: false,
          },
          {
            name: 'iOS Engineer',
            count: 1,
            active: false,
          },
        ],
      },
      ...caseArr,
    ]);
  });
});
describe('lib-helpers-tests : toggleTeamActive', () => {
  it('should still work if team does not exist', () => {
    expect(toggleTeamActive(SAMPLE_JOB_OPENINGS, 'Unknown Team', true)).toEqual(
      [{ active: false, jobs: [], name: '' }, ...SAMPLE_JOB_OPENINGS],
    );
  });
  it('should set all team jobs to active false', () => {
    const res = toggleTeamActive(SAMPLE_JOB_OPENINGS, 'Dev Team', true);
    const devTeam = res.find((team) => team.name === 'Dev Team');
    (devTeam?.jobs || []).forEach((job) => {
      expect(job).toEqual(expect.objectContaining({ active: false }));
    });
  });
  it('should set all team jobs to active true', () => {
    const res = toggleTeamActive(SAMPLE_JOB_OPENINGS, 'Dev Team', false);
    const devTeam = res.find((team) => team.name === 'Dev Team');
    (devTeam?.jobs || []).forEach((job) => {
      expect(job).toEqual(expect.objectContaining({ active: true }));
    });
  });
});
describe('lib-helpers-tests : togglePositionActive', () => {
  it('should still work if team does not exist', () => {
    expect(
      togglePositionActive(
        SAMPLE_JOB_OPENINGS,
        'Unknown Team',
        'Unknown Position',
      ),
    ).toEqual([
      {
        active: false,
        jobs: [{ name: '', count: 0, active: true }],
        name: '',
      },
      ...SAMPLE_JOB_OPENINGS,
    ]);
  });
  it('should set position to active false', () => {
    const res = togglePositionActive(
      SAMPLE_JOB_OPENINGS,
      'Product Team',
      'UI Designer',
    );
    const selectedTeam = res.find((team) => team.name === 'Product Team');
    expect(selectedTeam?.jobs?.[0].active).toEqual(false);
  });
  it('should set position to active true', () => {
    const res = togglePositionActive(
      SAMPLE_JOB_OPENINGS,
      'Dev Team',
      'iOS Engineer',
    );
    const selectedTeam = res.find((team) => team.name === 'Dev Team');
    expect(selectedTeam?.jobs?.[1].active).toEqual(true);
  });
});
describe('lib-helpers-tests : insertNewPositionToTeam', () => {
  it('should still work if team does not exist', () => {
    expect(
      insertNewPositionToTeam(SAMPLE_JOB_OPENINGS, 'Unknown Team', {
        name: 'Unknonw Position',
        count: 0,
        active: false,
      }),
    ).toEqual([
      {
        active: false,
        jobs: [{ name: 'Unknonw Position', count: 0, active: false }],
        name: '',
      },
      ...SAMPLE_JOB_OPENINGS,
    ]);
  });
  it('should insert new position to the team', () => {
    const newPosition = {
      name: 'New operation position',
      count: 2,
      active: true,
    };
    const res = insertNewPositionToTeam(
      SAMPLE_JOB_OPENINGS,
      'Operation Team',
      newPosition,
    );
    const selectedTeam = res.find((team) => team.name === 'Operation Team');
    expect(selectedTeam?.jobs?.[1]).toEqual(newPosition);
  });
});
describe('lib-helpers-tests : insertNewTeamToOpenings', () => {
  const newteam = {
    active: false,
    jobs: [],
    name: 'New Team',
  };
  it('should still work if openings are empty', () => {
    expect(insertNewTeamToOpenings([], 'New Team')).toEqual([newteam]);
  });
  it('should insert team into job openings', () => {
    expect(insertNewTeamToOpenings(SAMPLE_JOB_OPENINGS, 'New Team')).toEqual([
      newteam,
      ...SAMPLE_JOB_OPENINGS,
    ]);
  });
});
describe('lib-helpers-tests : updateTeamInOpenings', () => {
  it('should still work if team does not exist', () => {
    expect(updateTeamInOpenings([], 'Old Team', 'New Team')).toEqual([
      {
        active: false,
        jobs: [],
        name: 'New Team',
      },
    ]);
  });
  it('should update Team Name', () => {
    expect(
      updateTeamInOpenings(SAMPLE_JOB_OPENINGS, 'Dev Team', 'New Team')?.[0],
    ).toEqual({
      active: true,
      jobs: SAMPLE_JOB_OPENINGS[0].jobs,
      name: 'New Team',
    });
  });
});
