import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const generateToken = async (user) => {
  const token = await jwt.sign(
    { id: user.customer_id, firstName: user.name.split(' ')[0] },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  return token;
};
