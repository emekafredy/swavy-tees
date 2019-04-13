module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Sizes',
    [
      { value: 'S' },
      { value: 'M' },
      { value: 'L' },
      { value: 'XL' },
      { value: '2XL' },
      { value: '3XL' },
      { value: 'XS' },
      { value: '4XL' },
      { value: '5XL' },
      { value: '6XL' },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Sizes', null, {}),
};
