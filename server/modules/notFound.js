const notFound = (req, res) => {
  res.status(404).json({
    message: 'Oops! This route does not exist'
  });
};

export default notFound;
