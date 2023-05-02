import express from 'express'
import * as tweetController from '../controller/tweet.js'
import { body } from 'express-validator'
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateTweet = [
    body('text')
        .trim()
        .isLength({ min:4 })
        .withMessage('text는 최소 4자 이상 입력하세요!'),
    validate
]


// GET
// /tweet? username=:username, 닉네임 찾아서 리턴
router.get('/', tweetController.getTweets);

// GET
// /tweets/:id
router.get('/:id', tweetController.getTweet)
// 하나만 찾는거니까 filter가 아닌 find를 씀

// text가 4자 이하인 경우 에러 처리(POST, PUT)
// POST
// id: Date.now().toString()
// router.use(express.json())
router.post('/', validateTweet, tweetController.createTweet)

// PUT(수정)
// "text"만 수정
router.put('/:id', validateTweet, tweetController.updateTweet)

//DELETE
router.delete('/:id', tweetController.deleteTweet) // 실행 후 GET으로 id로 1번({{base}}/tweets/1)을 찾아보면 아무것도 안나온다.
export default router;

