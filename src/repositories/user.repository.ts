import Repository from './repository';
import { Service } from 'typedi';
import { Prisma, User, PrismaClient } from 'generated/prisma/pgsql-client';
import { prisma } from '@/utils/prisma.db';

@Service()
export default class UserRepository implements Repository<User> {
	async save(body: Prisma.UserCreateInput): Promise<User | never> {
		try {
			return (await (prisma() as PrismaClient).user.create({
				data: body,
			})) as unknown as User;
		} catch (error: any) {
			throw new Error('Somthing went wrong while saving user');
		}
	}

	async saveMany(body: Prisma.UserCreateInput[]): Promise<User[] | never> {
		try {
			return (await (prisma() as PrismaClient).user.createMany({
				data: body,
			})) as unknown as User[];
		} catch (error: any) {
			throw new Error('Somthing went wrong while saving user');
		}
	}

	async findOne(criteria: Prisma.UserWhereInput): Promise<User | null> {
		try {
			const User = await (prisma() as PrismaClient).user.findFirst({
				where: {
					...criteria,
				},
			});
			return User;
		} catch (error) {
			throw new Error('Somthing went wrong while fetching user');
		}
	}
}
