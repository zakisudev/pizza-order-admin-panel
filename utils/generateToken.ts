import jwt from 'jsonwebtoken';

const generateToken = async (user: any) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', {
    expiresIn: '1d',
  });
};

export default generateToken;