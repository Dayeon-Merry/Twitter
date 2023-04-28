import express from 'express'
import * as tweetController from '../controller/tweet.js'

const router = express.Router();
// GET
// /tweet? username=:username, 닉네임 찾아서 리턴
router.get('/', tweetController.getTweets);

// GET
// /tweets/:id
router.get('/:id', tweetController.getTweet)
// 하나만 찾는거니까 filter가 아닌 find를 씀

// POST
// id: Date.now().toString()
// router.use(express.json())
router.post('/', tweetController.createTweet)

// PUT(수정)
// "text"만 수정
router.put('/:id', tweetController.updateTweet)

//DELETE
router.delete('/:id', tweetController.deleteTweet) // 실행 후 GET으로 id로 1번({{base}}/tweets/1)을 찾아보면 아무것도 안나온다.
export default router;

