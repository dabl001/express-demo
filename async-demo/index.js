console.log('Start');

getUser(1, displayUser);

console.log('End');

function displayUser(user) {
    console.log(user);
    getRepositories(user.gitHubUsername, displayRepos);
}

function displayRepos(repos, displayCommits) {
    console.log(repos);
    const commits = ['async-demo', 'express-demo', 'vidly'];
    console.log('Getting commits from:', repos[0]);
    displayCommits(commits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, cb) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        cb({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, displayRepos) {
    setTimeout(() => {
        console.log('Getting the repositories of the user:', username);
        displayRepos(['repo1', 'repo2', 'repo3'], displayCommits);
    }, 2000);
}
