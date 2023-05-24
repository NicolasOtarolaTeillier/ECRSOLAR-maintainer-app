import { verify } from 'jsonwebtoken';

export default function profileHandler(req, res) {
    try {
        const { appEcrsolarToken } = req.cookies;
        if (!appEcrsolarToken) {
            return res.status(401).json({ error: 'no token' })
        }

        const user = verify(appEcrsolarToken, 'secret');
        const data = { email: user.email, username: user.username }
        return res.json(data);
    } catch (error) {
        return res.status(401).json({ error: 'invalid token' });
    }
}
