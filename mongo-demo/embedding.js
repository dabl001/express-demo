const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
    'Course',
    new mongoose.Schema({
        name: String,
        authors: [authorSchema],
    })
);

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors,
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    try {
        const course = await Course.updateOne(
            { _id: courseId },
            {
                $unset: {
                    author: '',
                },
            }
        );
        console.log('Author updated');
    } catch (err) {
        console.error(err);
    }
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    try {
        const course = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: { authors: { _id: authorId } },
            },
            { new: true }
        );

        if (course) {
            console.log('Author removed successfully.');
            console.log(course);
            mongoose
                .disconnect()
                .then(console.log('Disconnected from MongoDB'));
        } else {
            console.error('Course not found.');
            mongoose
                .disconnect()
                .then(console.log('Disconnected from MongoDB'));
        }
    } catch (error) {
        console.error(error);
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    }
}

removeAuthor('657e00ae7468ec301742f58b', '657f1c37dde4b001bbf9f7d0');
// addAuthor('657e00ae7468ec301742f58b', new Author({ name: 'Aron' }));
// updateAuthor('657d3eac2ea6a50d4c0bfbe6');
// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'John' }),
// ]);
