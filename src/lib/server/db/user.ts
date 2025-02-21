import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
	id: ObjectId,
	name: String,
	memory: Array<String>,
	sandbox_container_id: String
});
