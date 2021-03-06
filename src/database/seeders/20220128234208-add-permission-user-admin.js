module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'UserPermissions',
            [
                {
                    id: 1,
                    user_id: 1,
                    permission_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        ),

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            'UserPermissions',
            { id: { [Op.eq]: 1 } },
            {},
        );
    },
};
