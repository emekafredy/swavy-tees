module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Taxes',
    [
      {
        id: 1,
        taxType: 'Sales Tax at 8.5%',
        taxPercentage: 8,
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      },
      {
        id: 2,
        taxType: 'No Tax',
        taxPercentage: 0.00,
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Taxes', null, {}),
};
