module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Colors',
    [
      { value: 'red' },
      { value: 'blue' },
      { value: 'black' },
      { value: 'white' },
      { value: 'indigo' },
      { value: 'purple' },
      { value: 'green' },
      { value: 'silver' },
      { value: 'orange' },
      { value: 'gray' },
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Colors', null, {}),
};
