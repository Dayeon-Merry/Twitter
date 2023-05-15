import express from 'express'
import { body } from 'express-validator'
import * as scoreController from '../controller/score.js'
import { validate } from "../middleware/validator.js";

const router = express.Router();

// 학생의 성적 등록 시 입력하는 정보를 검증하기 위한 변수를 만듦
const validateScore =[
    body('stu_id')
        .notEmpty()
        .withMessage('학생 id를 꼭 입력하세요'),
    body('java')
        .isNumeric()
        .withMessage('성적은 숫자로 입력해야 합니다!'),
    body('python')
        .isNumeric()
        .withMessage('성적은 숫자로 입력해야 합니다!'),
    body('C_lang')
        .isNumeric()
        .withMessage('성적은 숫자로 입력해야 합니다!'),
    validate
]

// 라우터
//모든 학생의 등록된 성적을 석차 기준으로 보여준다.
router.get('/', scoreController.getScores);

// 학생 등록을 위해 /signup 경로로 post 요청이 들어올 경우 검증을 실행하고, 결과가 정상이면 signup함수를 실행
router.post('/signup', validateScore, scoreController.createScore)

// PUT(성적 정보 수정)
router.put('/:id', validateScore, scoreController.updateScore)

//DELETE(성적 정보 삭제)
router.delete('/:id', scoreController.deleteScore)
export default router;



