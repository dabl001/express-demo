const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    _id: String,
    tags: String,
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: Number,
});

const Course = mongoose.model('Course', courseSchema);

// createCourse();
async function createCourse() {
    try {
        const course = new Course({
            name: 'Angular Course',
            author: 'Abylay Dauletkhan',
            tags: ['angular', 'frontend'],
            isPublished: true,
        });
        const result = await course.save();
        console.log(result);
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    } catch (error) {
        console.error('Error creating course:', error.message);
    }
}

async function getCourses() {
    try {
        // eq (equal)
        // ne (not equal)
        // gt (greater than)
        // gte (greater than or equal to)
        // lt (less than)
        // lte (less than or equal to)
        // in
        // nin(not in)
        const pageNumber = 2;
        const pageSize = 10;
        const courses = await Course
            // .find({price: {$gte: 10, $lte: 20}})
            // .find()
            // .or([{author: 'Abylay'},{isPublished: true}])
            // .and([{author: 'Abylay'},{isPublished: true}])
            //find authors which starts with Mosh as: Moshasda, Mosh Hari
            // .find({ author: /^Mosh/ })
            //ends with Dauletkhan
            // .find({ author: /Dauletkhan$/i }) /Dauletkhan$/i adding i at the end makes it case insensitive
            //Contains Abylay i at the end makes case insensitive
            // .find({ author: /.*Abylay.*/i })
            .find({
                isPublished: true,
            })
            // .skip((pageNumber - 1) * pageSize)
            // .limit(pageSize)
            .sort({ name: 1 });
        // .count();
        console.log(courses);
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    } catch (error) {
        console.error('Failed to get courses', error.message);
    }
}

async function updateCourse(id) {
    try {
        console.log('Updating course with ID:', id);
        const result = await Course.findByIdAndUpdate(
            id,
            {
                $set: {
                    isPublished: false,
                    author: 'Jason',
                },
            },
            { new: true }
        );
        if (!result) {
            console.log('Course not found');
        } else {
            console.log('Updated course:', result);
        }
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    } catch (error) {
        console.error('Failed to update course', error.message);
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    }
}

async function deleteCourse(id) {
    try {
        console.log('Removing course with ID:', id);
        const result = await Course.findByIdAndDelete(id);
        if (!result) {
            console.log('Course not found');
        } else {
            console.log('Deleted course:', result);
        }
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    } catch (error) {
        console.error('Failed to update course', error.message);
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    }
}

deleteCourse('5a6900fff467b019a9001');
