module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'ShippingRegions',
    [
      {
        id: 1,
        shippingRegion: 'Please Select',
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      },
      {
        id: 2,
        shippingRegion: 'US / Canada',
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      },
      {
        id: 3,
        shippingRegion: 'Europe',
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      },
      {
        id: 4,
        shippingRegion: 'Rest of World',
        createdAt: '2019-04-09 20:51:53',
        updatedAt: '2019-04-09 20:51:53',
      }
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('ShippingRegions', null, {}),
};
