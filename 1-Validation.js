import express from 'express';
import { body, param, validationResult } from 'express-validator'

const app = express();
app.use(express.json()) // json으로 데이터를 받기위함
const validate = (req, res, next) => {
    const errors = validationResult(req) // 이 메서드때문에 에러값이 들어감
    if(errors.isEmpty()){
        return next();
    }
    return res.status(400).json({ message: errors.array()})
}

app.post(
    '/users',
    [
        body('name').isLength({min:4}).withMessage('이름은 4글자 이상으로 입력하세요!'),
        body('age').isInt().withMessage('숫자를 입력하세요'),
        body('email').isEmail().withMessage('이메일 형식을 확인해주세요').normalizeEmail(),
        body('job.name').notEmpty(),
        validate
    ],
    (req, res) => {
        console.log(req.body);
        res.sendStatus(201);
    }
);

app.get(
    '/:email',
    [
        param('email').isEmail().withMessage('이메일 형식을 확인하세요'), validate
    ],
    (req, res, next) => {
        res.sendStatus(200);
    }
);
// (어디로 갈 지, 밸리데이션을 위한 코드, 핸들러)
// [] 로 감싸주면 하나 이상 입력이 가능.
// normalizeEmail(): 형식 체크한 후에 다 소문자로 바꿔줌
app.listen(8080);

