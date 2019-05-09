export const ordersData = [
  {
    order_id: 1,
    total_amount: 113.94,
    created_on: new Date(),
    status: 'Ordered',
    comments: 'payments for order',
    auth_code: 'uyp4opo4[poi[3ouu',
    customer_id: 5,
    shipping_id: 1,
    reference: 'jgiroylk;klll',
    product_id: 1,
    attributes: 'Red,XL',
    quantity: 6,
    product_name: 'Good product',
    unit_cost: 18.99,
  }
];

export const shippingData = [
  {
    shipping_id: 1,
    shipping_cost: 20.00,
    shipping_type: 'Next Day Delivery ($20)',
    shipping_region_id: 2,
  },
  {
    shipping_id: 2,
    shipping_cost: 10.00,
    shipping_type: '3-4 Days ($10)',
    shipping_region_id: 2,
  },
];

export const shippingRegionData = [
  {
    shipping_region_id: 1,
    shipping_region: 'Please Select',
  },
  {
    shipping_region_id: 2,
    shipping_region: 'US / Canada',
  },
];
