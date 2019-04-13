module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Categories',
    [
      {
        id: 1,
        departmentId: 1,
        name: 'French',
        description: 'The French have always had an eye for beauty. One look at the T-shirts below and you\'ll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away',
      },
      {
        id: 2,
        departmentId: 1,
        name: 'Italian',
        description: 'The full and resplendent treasure chest of art, literature, music, and science that Italy has given the world is reflected splendidly in its postal stamps. If we could, we would dedicate hundreds of T-shirts to this amazing treasure of beautiful images',
      },
      {
        id: 3,
        departmentId: 1,
        name: 'Irish',
        description: 'It was Churchill who remarked that he thought the Irish most curious because they didn\'t want to be English. How right he was! But then, he was half-American, wasn\'t he? If you have an Irish genealogy you will want these T-shirts!',
      },
      {
        id: 4,
        departmentId: 2,
        name: 'Animal',
        description: 'Our ever-growing selection of beautiful animal T-shirts represents critters from everywhere, both wild and domestic.',
      },
      {
        id: 5,
        departmentId: 2,
        name: 'Flower',
        description: 'These unique and beautiful flower T-shirts are just the item for the gardener, flower arranger, florist, or general lover of things beautiful.',
      },
      {
        id: 6,
        departmentId: 3,
        name: 'Christmas',
        description: 'Because this is a unique Christmas T-shirt that you\'ll only wear a few times a year, it will probably last for decades (unless some grinch nabs it from you, of course).',
      },
      {
        id: 7,
        departmentId: 3,
        name: 'Valentine',
        description: 'For the more timid, all you have to do is wear your heartfelt message to get it across. Buy one for you and your sweetie(s) today!',
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Categories', null, {}),
};
