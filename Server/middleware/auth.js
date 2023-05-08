import jwt from 'jsonwebtoken'
import * as userRepository from '../data/auth.js'

const AUTH_ERROR = { message: '인증 에러!'};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        '4*MAOLE9ijD5#8wcxSUa43k#RszcRA',
        async (error, decoded) => {
            if(error){
                return res.status(401).json({ message: '인증 에러!1234'});
            }
            const user = await userRepository.findById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }
            req.userId = user.id;
            next()
        }
    )
}