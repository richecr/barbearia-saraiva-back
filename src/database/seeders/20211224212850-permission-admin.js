module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Permissions',
            [
                {
                    name: 'ADMIN',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        ),

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            'Permissions',
            { name: { [Op.eq]: 'ADMIN' } },
            {},
        );
    },
};
