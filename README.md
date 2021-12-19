# Desciption

Jobs R Us is a one stop application to manage job openings:

1. Expand & Collapse team data
2. Select & DeSelect team and position data
3. Add new team, add new positions
4. Modify team names, modify position names and count
5. Save configuration / data into local storage
6. Reset configuration / data

# Instructions

Requires node.js

Install dependencies from root repo folder (typescript, eslint, lerna):

```
In "../job-openings":

npm install       // install shared dependencies across packages (using lerna/monorepo concept)
npm run tsc       // executing typescript among all packages
npm run lint      // static lint checks
```

Install server (backend) dependencies and serve at http://localhost:8090

```
In "../job-openings/services/job-openings/api"

npm install      // install project dependencies
npm run dev      // serves the development server and watches for any changes
```

Install frontend dependencies and serve at http://localhost:8080

```
In "../job-openings/services/job-openings/front"

npm install     // install project dependencies
npm run dev     // serves the development server and watches for any changes
npm run test    // runs local unit test for logic and components
```

# Main Technologies used

- [ReactJS](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

# Disclaimer & Credits

This is a test project and is not for commercial use
