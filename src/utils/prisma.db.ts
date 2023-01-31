import {
	Prisma as PgsqlPrisma,
	PrismaClient as PgsqlClient,
} from 'generated/prisma/pgsql-client'; // pgsql
import {
	Prisma as MongodbPrisma,
	PrismaClient as MongodbClient,
} from 'generated/prisma/mongodb-client'; // mongodb
import Container from 'typedi';
import dotenv from 'dotenv';

function getDsn(connectionType: string): string {
	return connectionType == 'mongodb'
		? getMongoConnectionStr()
		: getPgsqlConnectionStr();
}
function getPgsqlConnectionStr(): string {
	return `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
}
function getMongoConnectionStr(): string {
	return `mongodb://${process.env.NOSQL_DB_USERNAME}:${process.env.NOSQL_DB_PASSWORD}@${process.env.NOSQL_DB_HOST}:${process.env.NOSQL_DB_PORT}/${process.env.NOSQL_DATABASE}?${process.env.NOSQL_DB_OPTION}`;
}

type PrismaClient = PgsqlClient | MongodbClient;
type PrismaClientOptions =
	| PgsqlPrisma.PrismaClientOptions
	| MongodbPrisma.PrismaClientOptions;

function getPrismaConfig(dsn: string): PrismaClientOptions {
	return {
		datasources: {
			db: { url: dsn },
		},
		log: [
			{
				emit: 'event',
				level: 'query',
			},
			{
				emit: 'stdout',
				level: 'error',
			},
			{
				emit: 'stdout',
				level: 'info',
			},
			{
				emit: 'stdout',
				level: 'warn',
			},
		],
	};
}

export const prisma = (connectionType = 'pgsql'): PrismaClient => {
	const dsn = getDsn(connectionType);
	const prismaConfig = getPrismaConfig(dsn);
	if (connectionType == 'pgsql') {
		if (Container.has(PgsqlClient)) return Container.get(PgsqlClient);
		const client = new PgsqlClient(
			prismaConfig as PgsqlPrisma.PrismaClientOptions
		);
		Container.set(PgsqlClient, client);
		return client;
	} else {
		if (Container.has(MongodbClient)) return Container.get(MongodbClient);
		const client = new MongodbClient(
			prismaConfig as MongodbPrisma.PrismaClientOptions
		);
		Container.set(MongodbClient, client);
		return client;
	}
};
