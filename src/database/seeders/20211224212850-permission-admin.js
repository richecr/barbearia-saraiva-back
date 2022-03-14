module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'Permissions',
            [
                {
                    id: 1,
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
            { id: { [Op.eq]: 1 } },
            {},
        );
    },
};
