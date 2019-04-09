module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Departments',
    [
      {
        id: 1,
        name: 'Regional',
        description: 'Proud of your country? Wear a T-shirt with a national symbol stamp!',
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      },
      {
        id: 2,
        name: 'Nature',
        description: 'Find beautiful T-shirts with animals and flowers in our Nature department!',
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      },
      {
        id: 3,
        name: 'Seasonal',
        description: 'Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures.',
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      }
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Departments', null, {}),
};
