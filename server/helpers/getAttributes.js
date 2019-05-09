// eslint-disable-next-line import/prefer-default-export
export const getAttributes = (product) => {
  const colors = product.AttributeValues.filter(item => item.Attribute.name === 'Color');
  const sizes = product.AttributeValues.filter(item => item.Attribute.name === 'Size');
  return {
    colors,
    sizes
  };
};
