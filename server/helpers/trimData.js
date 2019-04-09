
// eslint-disable-next-line import/prefer-default-export
export const trimData = (documentData) => {
  const dataValue = documentData;
  Object.keys(documentData)
    .forEach((key) => {
      dataValue[key] = dataValue[key].trim();
    });
  return dataValue;
};
