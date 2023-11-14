sendEmail();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email',
            });
        }, 4000);
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 7000);
    });
}

async function sendEmail() {
    const customer = await getCustomer();
    console.log('Customer:', customer);
    if (customer.isGold === true) {
        const movies = await getTopMovies();
        console.log(`Best movies are: ${movies}`);
        setTimeout(() => {
            console.log(
                `Movies: ${movies} sent to your email: ${customer.email}`
            );
        }, 4000);
    } else return console.log('you need Gold subscription!');
}
