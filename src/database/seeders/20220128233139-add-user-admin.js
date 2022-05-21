module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Users',
            [
                {
                    id: 1,
                    name: 'User Admin',
                    number_services: 0,
                    email: process.env.EMAIL_ADMIN,
                    birthday: '1999-05-17T03:00:00.000Z',
                    telephone: '83998412233',
                    notification_whatsapp: true,
                    notification_email: true,
                    password_hash: process.env.PASSWORD_ADMIN,
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
