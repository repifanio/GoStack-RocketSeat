import jwt from 'jsonwebtoken';

import User from '../models/User';
import sessionConfig from '../../config/sessionConf';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ message: 'Password not correct.' });
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, sessionConfig.secret, {
        expiresIn: sessionConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
