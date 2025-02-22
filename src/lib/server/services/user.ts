import type { ClientSession } from 'mongoose';
import assert from 'assert';

import { User, UserModel } from '../models/user';

import { withTransaction } from '../db';
import { ChatModel } from '../models/chat';

const getInitialUserMemory = (user: User) => [`I'm a virtual developer, my name is ${user.name}`];

export const initDeveloper = async (user: User) => {
	const memory = getInitialUserMemory(user);

	await UserModel.updateOne({ _id: user._id }, { $set: { memory } });

	user.memory = memory;
};

export const createOrGetUser = async (name: string, session?: ClientSession) => {
	let user = await UserModel.findOne({ name }).lean();

	if (!user) {
		await withTransaction(async (session) => {
			user = new UserModel({ name });

			await UserModel.create([user], { session });
			await ChatModel.create([{ user: user._id, content: 'How can I help you today?' }], {
				session
			});
		}, session);
	}

	assert.ok(user);

	return user;
};
