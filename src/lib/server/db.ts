import { MONGO_URL } from '$env/static/private';
import mongoose from 'mongoose';

export const withTransaction = async (
	fn: (session: mongoose.ClientSession) => Promise<any>,
	existingSession?: mongoose.ClientSession | null
) => {
	if (existingSession) {
		if (existingSession.inTransaction()) {
			await fn(existingSession);

			return;
		}

		await existingSession.withTransaction(fn);

		return;
	}

	const session = await mongoose.startSession();
	try {
		await session.withTransaction(fn);
	} finally {
		await session.endSession();
	}
};

/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
const mongoConnection = {
	isConnected: 0
};

export const dbConnect = async () => {
	console.log('MONGO_URL', MONGO_URL);
	if (mongoConnection.isConnected === 1) {
		console.log('Already connected.');
		return;
	}

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;
		if (mongoConnection.isConnected === 1) {
			console.log('using existing connection');
			return;
		}

		await mongoose.disconnect();
	}
	await mongoose.connect(MONGO_URL ?? '', {
		dbName: 'aids'
	});
	mongoConnection.isConnected = 1;
	console.log('connected to mongodb', MONGO_URL ?? '');
};

export const dbDisconnect = async () => {
	if (process.env.NODE_ENV === 'development') return;
	if (mongoConnection.isConnected === 0) return;

	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
	console.log('disconnected from mongodb');
};
