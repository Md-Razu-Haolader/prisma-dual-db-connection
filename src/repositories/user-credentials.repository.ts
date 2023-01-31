import Repository from './repository';
import { Service } from 'typedi';
import {
	Prisma,
	UserCredential,
	PrismaClient,
} from 'generated/prisma/mongodb-client';
import { prisma } from '@/utils/prisma.db';
import { AnyObject } from '@/types';

@Service()
export default class UserCredentialRepository
	implements Repository<UserCredential>
{
	async save(
		body: Prisma.UserCredentialCreateInput
	): Promise<UserCredential | never> {
		try {
			return (await (prisma('mongodb') as PrismaClient).userCredential.create({
				data: body,
			})) as unknown as UserCredential;
		} catch (error: unknown) {
			throw new Error('Somthing went wrong while saving user credentials');
		}
	}

	async saveMany(
		body: Prisma.UserCredentialCreateInput[]
	): Promise<UserCredential[] | never> {
		try {
			return (await (
				prisma('mongodb') as PrismaClient
			).userCredential.createMany({
				data: body,
			})) as unknown as UserCredential[];
		} catch (error: unknown) {
			throw new Error('Somthing went wrong while saving user credentials');
		}
	}

	async findOne(
		criteria: Prisma.UserCredentialWhereInput
	): Promise<UserCredential | null> {
		try {
			return await (prisma('mongodb') as PrismaClient).userCredential.findFirst(
				{
					where: {
						...criteria,
					},
				}
			);
		} catch (error: unknown) {
			throw new Error('Somthing went wrong while fetching user credentials');
		}
	}

	async update(
		conditions: Prisma.UserCredentialWhereUniqueInput,
		body: Prisma.UserCredentialUpdateInput
	): Promise<UserCredential | never> {
		try {
			const oldData = await this.findOne(conditions);
			const newData = {
				...(oldData?.credentials as AnyObject),
				...(body?.credentials as AnyObject),
			};
			return (await (prisma('mongodb') as PrismaClient).userCredential.update({
				where: {
					...conditions,
				},
				data: { credentials: newData },
			})) as unknown as UserCredential;
		} catch (error: any) {
			throw new Error('Somthing went wrong while updating user credentials');
		}
	}

	async upsert(
		conditions: Prisma.UserCredentialWhereUniqueInput,
		body: Prisma.UserCredentialCreateInput | Prisma.UserCredentialUpdateInput
	): Promise<UserCredential | never> {
		try {
			const oldData = await this.findOne(conditions);
			const newData = {
				...(oldData?.credentials as AnyObject),
				...(body?.credentials as AnyObject),
			};
			return (await (prisma('mongodb') as PrismaClient).userCredential.upsert({
				where: {
					...conditions,
				},
				create: body as Prisma.UserCredentialCreateInput,
				update: { credentials: newData } as Prisma.UserCredentialUpdateInput,
			})) as unknown as UserCredential;
		} catch (error: any) {
			throw new Error('Somthing went wrong while upsert user credentials');
		}
	}
}
