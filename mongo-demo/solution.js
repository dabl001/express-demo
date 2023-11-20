const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://dabl01:Abyl2001@cluster0.4oqyp.mongodb.net/')
    .then(() => console.log('Connected to the mongodb...'))
    .catch((error) => console.error('Failed to connect to mongodb', error));

const courseSchema = new mongoose.Schema({
    id: String,
    tags: String,
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: Number,
});

const Course = mongoose.model('Course', courseSchema);

getCourses();

async function getCourses() {
    try {
        const courses = await Course.find({
            isPublished: true,
        })
            .or([{ price: { $gte: 15 } }, { name: /.*by*./i }])
            .collation({ locale: 'en', strength: 2 })
            .sort({ price: -1 })
            .select({ author: 1, name: 1, price: 1 });
        console.log(courses);
        mongoose
            .disconnect()
            .then(() => console.log('Disconnected from MongoDB'));
    } catch (error) {
        console.error('Failed to get courses from DB');
    }
}
