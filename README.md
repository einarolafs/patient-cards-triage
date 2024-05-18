# Patient cards Triage

A Triage Patient's cards that can move cards from the TODO column to the DONE column

- Fetch the patient cards using our local server
- Display the patient cards in the corresponding column ( _Pending_ + _Rejected_ and _Done_ )
- Allow user to change the card status from _Pending_ or _Rejected_ to _Done_ and from _Done_ to _Rejected_.
- Add a local filtering by patient name and arrythmias

## How to use this project

To start the project, first install all dependencies:
```
npm install
````

After that simply start the project to start both the data server and the webpack-dev-server
```
npm start
````

The project can also be build and the server run independently

To build the project, run the following command. It will output the result to build/app
```
npm run build
```

Then you can run the server with the following command:
```
npm run api
```

The project is protected from pushing up to the master branch on Github and is also checked with git pre-push hooks to prevent any code to be pushed to the remote repository before first passing both all tests and linting.

Test and linting checks can also be run manually:
```
npm test
```
To run test in watch mode, run the following:
```
npm run test:watch
```

_____

## Feel free to push up branches to this repository and create PRs to test the workflow
