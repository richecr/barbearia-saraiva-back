module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'User Admin',
                    email: 'user_admin@gmail.com',
                    birthday: '1999-05-17T03:00:00.000Z',
                    telephone: '83998412233',
                    notification_whatsapp: true,
                    notification_email: true,
                    password_hash:
                        '$2b$08$YeVsTW.bMuHkolIjn5JVDOzQBBIX3ukbv7QLS/KJdSoxNsZNYDw0C',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        ),

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete('Users', { id: { [Op.eq]: 1 } }, {});
    },
};
