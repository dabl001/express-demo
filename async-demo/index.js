console.log('Start');

// getUser(1)
//     .then(displayUser)
//     .then(displayRepos)
//     .then(displayCommits)
//     .catch((error) => console.log('Error:', error.message));

displayCommits();

console.log('End');

//Async and await
async function displayCommits() {
    try {
        const user = await getUser(1);
        const username = await displayUser(user);
        const repos = await getRepositories(username);
        const commits = await displayRepos(repos);
        console.log(commits);
    } catch (error) {
        console.log('Error', error.message);
    }
}

function displayUser(user) {
    return new Promise((resolve, reject) => {
        console.log(user);
        resolve(user.gitHubUsername);
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
