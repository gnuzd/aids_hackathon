import OpenAI from 'openai';
import assert from 'assert';

import { User, UserModel } from '../models/user';
import { OPEN_AI_KEY } from '$env/static/private';

export enum DeveloperAction {
	JUST_A_CHAT = 'JUST_A_CHAT',
	UPDATE_KNOWLEDGE = 'UPDATE_KNOWLEDGE',
	CREATE_NEW_PROJECT = 'CREATE_NEW_PROJECT'
}

const openai = new OpenAI({
	apiKey: OPEN_AI_KEY
});

export const determineActionFromChat = async (user: User, message: string) => {
	assert.ok(user.memory?.length);

	const memory = user.memory.map((m) => ({ role: 'system', content: m }) as const);

	const response = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [...memory, { role: 'user', content: message }]
	});

	const content = response.choices[0].message.content;
	console.log('response', content);

	return content;
};
