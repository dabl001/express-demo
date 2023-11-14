console.log('Start');

getUser(1)
    .then(displayUser)
    .then(displayRepos)
    .then(displayCommits)
    .catch((error) => console.log('Error:', error.message));

console.log('End');

function displayUser(user) {
    return new Promise((resolve, reject) => {
        console.log(user);
        resolve(getRepositories(user.gitHubUsername));
    });
}

function displayRepos(repos) {
    return new Promise((resolve, reject) => {
        console.log(repos);
        setTimeout(() => {
            console.log('Getting commits from:', repos[0]);
            resolve(['async-demo', 'express-demo', 'vidly']);
        }, 2000);
    });
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting the repositories of the user:', username);
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}
