export const productsData = [
  {
    id: 1,
    name: 'Arc d\'Triomphe',
    description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
    price: 14.99,
    discountedPrice: 0.00,
    image: 'arc-d-triomphe.gif',
    image2: 'arc-d-triomphe-2.gif',
    thumbnail: 'arc-d-triomphe-thumbnail.gif',
    display: 0,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    id: 2,
    name: 'Chartres Cathedral',
    description: '"The Fur Merchants". Not all the beautiful',
    price: 16.95,
    discountedPrice: 15.95,
    image: 'kjhjopjjkn',
    image2: 'jknkjpjk[kp',
    thumbnail: 'ljojpkpkp[kkk',
    display: 2,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    id: 3,
    name: 'Coat of Arms',
    description: 'There\'s good reason why the ship plays a prominent part on this shield!',
    price: 14.50,
    discountedPrice: 0.00,
    image: 'jnkjlk;ko',
    image2: 'iuhipojopjojj',
    thumbnail: 'ihiohopii[kop',
    display: 0,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    id: 4,
    name: 'Gallic Cock',
    description: 'This fancy chicken',
    price: 18.99,
    discountedPrice: 16.99,
    image: 'jbohkjj',
    image2: 'hbvjihh',
    thumbnail: 'kbohjubiuugih',
    display: 2,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    id: 5,
    name: 'Marianne',
    description: 'She symbolizes the "Triumph of the Republic"',
    price: 15.95,
    discountedPrice: 14.95,
    image: 'jkjljiojjo',
    image2: 'jhiojjpojkpkp',
    thumbnail: 'jhiohjolk',
    display: 2,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    id: 6,
    name: 'Alsace',
    description: 'It was in this region of France',
    price: 16.50,
    discountedPrice: 0.00,
    image: 'IBHKLH;JJ',
    image2: 'ugioghipojo',
    thumbnail: 'ihhojopjopjjoo',
    display: 0,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
];

export const categoriesData = [
  {
    id: 1,
    departmentId: 1,
    name: 'French',
    description: 'The French have always had an eye for beauty.',
  },
  {
    id: 2,
    departmentId: 1,
    name: 'Italian',
    description: 'The full and resplendent treasure',
  },
  {
    id: 3,
    departmentId: 1,
    name: 'Irish',
    description: 'It was Churchill who remarked',
  },
  {
    id: 4,
    departmentId: 2,
    name: 'Flower',
    description: 'These unique and beautiful',
  },
];

export const departmentsData = [
  {
    id: 1,
    name: 'Regional',
    description: 'Proud of your country? Wear a T-shirt with a national symbol stamp!',
  },
  {
    id: 2,
    name: 'Nature',
    description: 'Find beautiful T-shirts with animals and flowers in our Nature department!',
  },
];

export const productCategories = [
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
    categoryId: 2,
  },
  {
    id: 4,
    productId: 4,
    categoryId: 2,
  },
  {
    id: 5,
    productId: 5,
    categoryId: 3,
  },
  {
    id: 6,
    productId: 6,
    categoryId: 4,
  },
];

export const colorData = [
  { value: 'red' },
  { value: 'blue' },
];

export const sizeData = [
  { value: 'S' },
  { value: 'M' },
];

export const productColorsData = [
  { productId: 1, colorId: 1 },
  { productId: 1, colorId: 2 },
  { productId: 2, colorId: 1 },
  { productId: 2, colorId: 2 },
];

export const productSizesData = [
  { productId: 1, sizeId: 1 },
  { productId: 1, sizeId: 2 },
  { productId: 2, sizeId: 1 },
  { productId: 2, sizeId: 2 },
];
