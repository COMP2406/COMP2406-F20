const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	const author = new Person({
		name: 'Ian Fleming',
		age: 50
	});

	author.save(function (err) {
		if (err) throw err;

		const story1 = new Story({
			title: 'Casino Royale',
			author: author._id // assign the _id from the person
		});

//Does anybody see what could go wrong with this approach?
		story1.save(function (err, result) {
			if (err) throw err;
			author.stories.push(story1);
			author.save(function(err, result){
				if (err) throw err;
				console.log("All saved.");
			})
		});
	});
});