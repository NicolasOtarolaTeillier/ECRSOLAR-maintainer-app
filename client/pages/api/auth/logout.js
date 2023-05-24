import { verify } from 'jsonwebtoken';
import {serialize} from 'cookie';

export default function logoutHandler(req, res) {

    const { appEcrsolarToken } = req.cookies;

    if (!appEcrsolarToken) {
        return res.status(401).json({ error: 'no token' })

    }

    try {
        verify(appEcrsolarToken, 'secret')
        const serialized = serialize("appEcrsolarToken", null, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0,
            path: "/",
          });

          res.setHeader('Set-Cookie',serialized)
          res.status(200).json('logout succesfully')
    }
    catch (error) {
        return res.status(401).json({error: 'invalid token'})
    }

}