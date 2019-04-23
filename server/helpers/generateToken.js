import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const generateToken = async (user) => {
  const token = await jwt.sign(
    { id: user.id, role: user.role, firstName: user.firstName },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  return token;
};
