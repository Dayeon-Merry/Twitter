import express from 'express'
import { body } from 'express-validator'
import { validate } from "../middleware/validator.js";
import * as stuController from '../controller/student.js';

const router = express.Router();

// 학생 등록 시 입력하는 정보를 검증하기 위한 변수를 만듦
const validateSignup =[
    body('stu_num')
        .trim()
        .notEmpty()
        .isLength({ min:5 })
        .withMessage('학번은 최소 5자 이상 입력하세요!'),
    body('stu_name')
        .notEmpty()
        .withMessage('이름를 꼭 입력하세요'),
    body('stu_hp')
        .notEmpty()
        .withMessage('전화번호를 꼭 입력하세요'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('email 형식에 맞게 쓰세요!'),
    validate
]
const validateUpdate =[
    body('stu_name')
        .notEmpty()
        .withMessage('이름를 꼭 입력하세요'),
    body('stu_hp')
        .notEmpty()
        .withMessage('전화번호를 꼭 입력하세요'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('email 형식에 맞게 쓰세요!'),
    validate
]
// 라우터
// 학생 등록을 위해 /signup 경로로 post 요청이 들어올 경우 검증을 실행하고, 결과가 정상이면 signup함수를 실행
router.get('/', stuController.getAllstu)

router.post('/signup', validateSignup, stuController.signup)

// PUT(학생 정보 수정)
router.put('/:id', validateUpdate, stuController.updateStu)

//DELETE(학생 정보 삭제)
router.delete('/:id', stuController.deleteStu)
export default router;



