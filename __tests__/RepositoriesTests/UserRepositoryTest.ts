/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import '../../src/app';
import UserRepository from '../../src/app/repository/UserRepository';
import { IUser } from '../../src/app/models/User';

let user_created_1: IUser;
let user_created_2: IUser;

describe('Tests user repository', () => {
    it('Test create user', async () => {
        user_created_1 = await UserRepository.create({
            name: "Rich Elton",
            email: "richelton@gmail.com",
            birthday: "1999-05-17T03:00:00.000Z",
            password: "Teste123@",
            telephone: "83998412233",
            notification_email: true,
            notification_whatsapp: false
        });

        user_created_2 = await UserRepository.create({
            name: "Levi Rios",
            email: "levirios@gmail.com",
            birthday: "1999-11-11T03:00:00.000Z",
            password: "Teste123@",
            telephone: "83998411122",
            notification_email: true,
            notification_whatsapp: true
        });

        expect(user_created_1.name).toBe('Rich Elton');
        expect(user_created_2.name).toBe('Levi Rios');
    });

    it('Test get all users', async () => {
        const users = await UserRepository.findAll();

        expect(users).toMatchObject([
            { name: 'Rich Elton' },
            { name: 'Levi Rios' },
        ]);
    });

    it('Test get all users with error', async () => {
        const users = await UserRepository.findAll();

        expect(users).not.toMatchObject([
            { name: 'Rich Elton' },
        ]);
    });

    it('Test get users with filters', async () => {
        const users = await UserRepository.findByFilters({ name: 'Rich Elton' });

        expect(users).toMatchObject([
            { name: 'Rich Elton' },
        ]);

        expect(users.length).toEqual(1);
    });

    it('Test get users with filters with name is not exists', async () => {
        const users = await UserRepository.findByFilters({ name: 'user' });

        expect(users).toMatchObject([]);
    });

    it('Test get users with filters with id is equal 1', async () => {
        const users = await UserRepository.findByFilters({ id: user_created_1.id });

        expect(users).toMatchObject([
            { name: 'Rich Elton', id: user_created_1.id },
        ]);
        expect(users.length).toEqual(1);
    });

    it('Test get users with filters with id is not exists', async () => {
        const users = await UserRepository.findByFilters({ id: 150 });

        expect(users).toMatchObject([]);
    });

    it('Test get by id users', async () => {
        const users = await UserRepository.findById(user_created_2.id);

        expect(users).toMatchObject({ name: 'Levi Rios', id: user_created_2.id });
    });

    it('Test get by id users with id not exists', async () => {
        const users = await UserRepository.findById(150);

        expect(users).toEqual(null);
    });

    it('Test update users', async () => {
        const users = await UserRepository.update(user_created_2.id, { name: 'Levi Rios Update' });
        const user = await UserRepository.findById(user_created_2.id);

        expect(users[0]).toEqual(1);
        expect(user).toMatchObject({ name: 'Levi Rios Update', id: user_created_2.id });
    });

    it('Test update users with id not exists', async () => {
        const users = await UserRepository.update(150, { name: 'user 3 Test Update' });

        expect(users[0]).toEqual(0);
    });

    it('Test delete users', async () => {
        const user = await UserRepository.delete(user_created_2.id);
        const user_deleted = await UserRepository.findById(user_created_2.id);

        expect(user).toMatchObject({ name: 'Levi Rios Update', id: user_created_2.id });
        expect(user_deleted).toEqual(null);
    });

    it('Test delete users with id not exists', async () => {
        const user = await UserRepository.delete(150);

        expect(user).toEqual(null);
    });

    afterAll(async () => {
        await UserRepository.delete(user_created_1.id);
    });
});