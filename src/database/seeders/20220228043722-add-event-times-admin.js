module.exports = {
    up: async (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'EventTimes',
            [
                {
                    id: 1,
                    event_name: 'corte',
                    duration: 45,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    event_name: 'barba',
                    duration: 20,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 3,
                    event_name: 'barboterapia',
                    duration: 25,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 4,
                    event_name: 'sobrancelha',
                    duration: 10,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 5,
                    event_name: 'hidratação',
                    duration: 15,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 6,
                    event_name: 'acabamento',
                    duration: 10,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 7,
                    event_name: 'progressiva',
                    duration: 100,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 8,
                    event_name: 'botox',
                    duration: 100,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 9,
                    event_name: 'tintura',
                    duration: 60,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 10,
                    event_name: 'platinado',
                    duration: 60,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 11,
                    event_name: 'corte+barba',
                    duration: 60,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 12,
                    event_name: 'corte+barba+sobrancelha',
                    duration: 70,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 13,
                    event_name: 'corte+barba+hidratacao',
                    duration: 75,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 14,
                    event_name: 'corte+barba+progressiva',
                    duration: 110,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 15,
                    event_name: 'corte+barba+botox',
                    duration: 110,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 16,
                    event_name: 'corte+barboterapia',
                    duration: 70,
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
            {
                id: {
                    [Op.in]: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    ],
                },
            },
            {},
        );
    },
};
