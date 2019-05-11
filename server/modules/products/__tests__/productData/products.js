export const productsData = [
  {
    product_id: 1,
    name: 'Arc d\'Triomphe',
    description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
    price: 14.99,
    discounted_price: 0.00,
    image: 'arc-d-triomphe.gif',
    image_2: 'arc-d-triomphe-2.gif',
    thumbnail: 'arc-d-triomphe-thumbnail.gif',
    display: 0,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    product_id: 2,
    name: 'Chartres Cathedral',
    description: '"The Fur Merchants". Not all the beautiful',
    price: 16.95,
    discounted_price: 15.95,
    image: 'chartres-cathedral.gif',
    image_2: 'jknkjpjk[kp',
    thumbnail: 'ljojpkpkp[kkk',
    display: 2,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    product_id: 3,
    name: 'Coat of Arms',
    description: 'There\'s good reason why the ship plays a prominent part on this shield!',
    price: 14.50,
    discounted_price: 0.00,
    image: 'jnkjlk;ko',
    image_2: 'iuhipojopjojj',
    thumbnail: 'ihiohopii[kop',
    display: 0,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    product_id: 4,
    name: 'Gallic Cock',
    description: 'This fancy chicken',
    price: 18.99,
    discounted_price: 16.99,
    image: 'jbohkjj',
    image_2: 'hbvjihh',
    thumbnail: 'kbohjubiuugih',
    display: 2,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    product_id: 5,
    name: 'Marianne',
    description: 'She symbolizes the "Triumph of the Republic"',
    price: 15.95,
    discounted_price: 14.95,
    image: 'jkjljiojjo',
    image_2: 'jhiojjpojkpkp',
    thumbnail: 'jhiohjolk',
    display: 2,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
  {
    product_id: 6,
    name: 'Alsace',
    description: 'It was in this region of France',
    price: 16.50,
    discounted_price: 0.00,
    image: 'IBHKLH;JJ',
    image_2: 'ugioghipojo',
    thumbnail: 'ihhojopjopjjoo',
    display: 0,
    createdAt: '2019-04-09 20:51:53',
    updatedAt: '2019-04-09 20:51:53',
  },
];

export const categoriesData = [
  {
    category_id: 1,
    department_id: 1,
    name: 'French',
    description: 'The French have always had an eye for beauty.',
  },
  {
    category_id: 2,
    department_id: 1,
    name: 'Italian',
    description: 'The full and resplendent treasure',
  },
  {
    category_id: 3,
    department_id: 1,
    name: 'Irish',
    description: 'It was Churchill who remarked',
  },
  {
    category_id: 4,
    department_id: 2,
    name: 'Flower',
    description: 'These unique and beautiful',
  },
];

export const departmentsData = [
  {
    department_id: 1,
    name: 'Regional',
    description: 'Proud of your country? Wear a T-shirt with a national symbol stamp!',
  },
  {
    department_id: 2,
    name: 'Nature',
    description: 'Find beautiful T-shirts with animals and flowers in our Nature department!',
  },
];

export const productCategories = [
  {
    product_id: 1,
    category_id: 1,
  },
  {
    product_id: 2,
    category_id: 1,
  },
  {
    product_id: 3,
    category_id: 2,
  },
  {
    product_id: 4,
    category_id: 2,
  },
  {
    product_id: 5,
    category_id: 3,
  },
  {
    product_id: 6,
    category_id: 4,
  },
];

export const attributeData = [
  { attribute_id: 1, name: 'Size' },
  { attribute_id: 2, name: 'Color' }
];

export const attributeValueData = [
  { attribute_value_id: 1, attribute_id: 1, value: 'S' },
  { attribute_value_id: 2, attribute_id: 1, value: 'L' },
  { attribute_value_id: 3, attribute_id: 1, value: 'XL' },
  { attribute_value_id: 4, attribute_id: 2, value: 'Red' },
  { attribute_value_id: 5, attribute_id: 2, value: 'Black' },
  { attribute_value_id: 6, attribute_id: 2, value: 'Blue' },
];

export const productAttributeData = [
  { product_id: 1, attribute_value_id: 1 },
  { product_id: 1, attribute_value_id: 2 },
  { product_id: 1, attribute_value_id: 4 },
  { product_id: 2, attribute_value_id: 3 },
  { product_id: 2, attribute_value_id: 5 },
  { product_id: 2, attribute_value_id: 6 },
  { product_id: 3, attribute_value_id: 1 },
  { product_id: 3, attribute_value_id: 4 },
  { product_id: 4, attribute_value_id: 2 },
  { product_id: 4, attribute_value_id: 6 },
  { product_id: 5, attribute_value_id: 1 },
  { product_id: 5, attribute_value_id: 5 },
  { product_id: 6, attribute_value_id: 1 },
  { product_id: 6, attribute_value_id: 5 },
];

export const cartData = [
  {
    item_id: 1,
    cart_id: 'ijkiiuoejhkni',
    product_id: 1,
    attributes: 'Red,L',
    quantity: 3,
    buy_now: 1,
    added_on: '2019-05-10 14:28:10'
  },
  {
    item_id: 2,
    cart_id: 'ijkiiuoejhkni',
    product_id: 2,
    attributes: 'Black,S',
    quantity: 3,
    buy_now: 1,
    added_on: '2019-05-10 14:28:10'
  },
  {
    item_id: 3,
    cart_id: 'ijkiiuoejhkni',
    product_id: 1,
    attributes: 'Blue,L',
    quantity: 3,
    buy_now: 1,
    added_on: '2019-05-10 14:28:10'
  }
];
