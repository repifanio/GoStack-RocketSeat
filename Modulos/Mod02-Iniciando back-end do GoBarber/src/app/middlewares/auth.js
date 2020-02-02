import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import sessionConfig from '../../config/sessionConf';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ Error: 'Token not found' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decode = await promisify(jwt.verify)(token, sessionConfig.secret);
    request.userId = decode.id;
    return next();
  } catch (err) {
    return response.status(401).json({ Error: 'Inválid Token ' });
  }
};
