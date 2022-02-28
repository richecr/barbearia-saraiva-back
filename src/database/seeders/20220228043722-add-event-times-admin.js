module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'EventTimes',
            [
                {
                    id: 1,
                    event_name: "corte",
                    duration: 60,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    event_name: "barba",
                    duration: 30,
                    created_at: new Date(),
                    updated_at: new Date(),
                },{
                    id: 3,
                    event_name: "corte+barba",
                    duration: 90,
                    created_at: new Date(),
                    updated_at: new Date(),
                },{
                    id: 4,
                    event_name: "corte+hidratacao",
                    duration: 60,
                    created_at: new Date(),
                    updated_at: new Date(),
                },{
                    id: 5,
                    event_name: "botox",
                    duration: 60,
                    created_at: new Date(),
                    updated_at: new Date(),
                },{
                    id: 6,
                    event_name: "progressiva",
                    duration: 90,
                    created_at: new Date(),
                    updated_at: new Date(),
                },{
                    id: 7,
                    event_name: "corte+barba+progressiva",
                    duration: 120,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        ),

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            'EventTimes',
            { id: { [Op.in]: [1,2,3,4,5,6,7] } },
            {},
        );
    },
};
