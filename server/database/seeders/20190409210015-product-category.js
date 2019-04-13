module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'ProductCategories',
    [
      {
        id: 1,
        productId: 1,
        categoryId: 1,
      },
      {
        id: 2,
        productId: 2,
        categoryId: 1,
      },
      {
        id: 3,
        productId: 3,
        categoryId: 1,
      },
      {
        id: 4,
        productId: 4,
        categoryId: 1,
      },
      {
        id: 5,
        productId: 5,
        categoryId: 1,
      },
      {
        id: 6,
        productId: 6,
        categoryId: 1,
      },
      {
        id: 7,
        productId: 7,
        categoryId: 1,
      },
      {
        id: 8,
        productId: 8,
        categoryId: 1,
      },
      {
        id: 9,
        productId: 9,
        categoryId: 1,
      },
      {
        id: 10,
        productId: 10,
        categoryId: 1,
      },
      {
        id: 11,
        productId: 11,
        categoryId: 1,
      },
      {
        id: 12,
        productId: 12,
        categoryId: 1,
      },
      {
        id: 13,
        productId: 13,
        categoryId: 1,
      },
      {
        id: 14,
        productId: 14,
        categoryId: 1,
      },
      {
        id: 15,
        productId: 15,
        categoryId: 1,
      },
      {
        id: 16,
        productId: 16,
        categoryId: 1,
      },
      {
        id: 17,
        productId: 17,
        categoryId: 1,
      },
      {
        id: 18,
        productId: 18,
        categoryId: 1,
      },
      {
        id: 19,
        productId: 19,
        categoryId: 2,
      },
      {
        id: 20,
        productId: 20,
        categoryId: 2,
      },
      {
        id: 21,
        productId: 21,
        categoryId: 2,
      },
      {
        id: 22,
        productId: 22,
        categoryId: 2,
      },
      {
        id: 23,
        productId: 23,
        categoryId: 2,
      },
      {
        id: 24,
        productId: 24,
        categoryId: 2,
      },
      {
        id: 25,
        productId: 25,
        categoryId: 2,
      },
      {
        id: 26,
        productId: 26,
        categoryId: 3,
      },
      {
        id: 27,
        productId: 27,
        categoryId: 3,
      },
      {
        id: 28,
        productId: 28,
        categoryId: 4,
      },
      {
        id: 29,
        productId: 29,
        categoryId: 4,
      },
      {
        id: 30,
        productId: 30,
        categoryId: 5,
      },
      {
        id: 31,
        productId: 31,
        categoryId: 5,
      },
      {
        id: 32,
        productId: 32,
        categoryId: 6,
      },
      {
        id: 33,
        productId: 33,
        categoryId: 6,
      },
      {
        id: 34,
        productId: 34,
        categoryId: 7,
      },
      {
        id: 35,
        productId: 35,
        categoryId: 7,
      }
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('ProductCategories', null, {}),
};
