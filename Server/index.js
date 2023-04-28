import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tweetsRouter from './router/tweets.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))  // 사용자들이 접속하면 log를 콘솔에 찍음(HTTP 요청 로깅을 간단하게 처리하고자 할 때 사용)
// router
app.use('/tweets', tweetsRouter)
app.use((req, res, next) => {
    res.sendStatus(404)
})
// 서버에러
app.use((error, req, res, next) => {
    console.log(error)
    res.sendStatus(500)
})
app.listen(8080)