import jwt from 'jsonwebtoken';
import bcrypt, { hashSync } from 'bcrypt';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = 'bPzUbcmC$Wv0S98*x1g5%LKX#Y7b8tJU'
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 10;

// 핸들러들
export async function signup(req, res) {
    // req.body 데이터를 받아 회원가입 시키는 함수
    // 해당 아이디가 존재한다면 "409"를 리턴
    // userRepository에 데이터를 저장(비밀번호는 bcrypt를 사용하여 저장)
    // JWT를 이용하여 사용자에게 json으로 전달
    const { username, password, name, email, url } = req.body;
    const found = await userRepository.findByUername(username);

    if(found){
        return res.status(409).json({ message: `${username}은 이미 가입되었습니다!`})
    }
    const hashed = bcrypt.hash(password, bcryptSaltRounds)
    // hashSync를 왜 안쓰지? await면 비동기니까 Sync를 안쓴것.
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    })
    const token = createJwtToken(userId)
    res.ststus(201).json({token, username});
}

export async function login(req, res) {
    // req.body 데이터를 받아 해당 아이디로 로그인 여부를 판단
    // 해당 아이디가 존재하지 않으면 "401"을 리턴
    // bcrypt를 이용하여 비밀번호까지 모두 맞다면 해당 정보를 JWT를 이용하여 사용자에게 json으로 전달
    const { username, password } = req.body;
    const user = await userRepository.findByUername(username);
    if(!user){
        return res.status(401).json({ message: '아이디가 존재하지 않습니다!'});
    }
    const isValidpassword = await bcrypt.compare(password, user.password)
    if(!isValidpassword){
        return res.status(401).json({ message: '아이디 또는 비밀번호를 확인하세요!'});
    }
    const token = createJwtToken(user.id)
    req.status(200).json({token, username});
}

export async function me(rea, res, next) {
    // 
}


function createJwtToken(id) {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: bcryptSaltRounds})
}