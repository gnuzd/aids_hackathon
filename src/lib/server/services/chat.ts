import type { ObjectId } from 'mongoose';
import { ChatModel } from '../models/chat';

export const listChat = async (user: ObjectId) => {
	let messages = await ChatModel.find({ user });
	return messages;
};
