const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    _id: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        resolve(result);
                    }, 4000);
                });
            },
            message: 'A course should have at least one tag.',
        },
    },
    date: { type: Date, default: Date.now },
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    author: String,
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'],
        required: true,
        lowercase: true,
        trim: true,
        // uppercase: true
    },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
        required: function () {
            return this.isPublished;
        },
    },
    __v: Number,
});

const Course = mongoose.model('Course', courseSchema);

// createCourse();
async function createCourse() {
    try {
        const course = new Course({
            name: 'Angular Course',
            category: 'Web',
            author: 'Abylay Dauletkhan',
            tags: ['frontend'],
            isPublished: true,
            price: 15.5,
            _id: '342dsfsdt43resfs',
        });
        const result = await course.save();
        console.log(result);
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
    } catch (ex) {
        for (field in ex.errors) console.log(ex.errors[field].message);
        // console.error('Error creating course:', error.message);
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
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
        mongoose.disconnect().then(console.log('Disconnected from MongoDB'));
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

createCourse('342dsfsdt43resfs');
