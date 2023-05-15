import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import scoreRouter from './router/score.js'
import studentRouter from './router/student.js'
import { config } from './config.js';


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))  // 사용자들이 접속하면 log를 콘솔에 찍음(HTTP 요청 로깅을 간단하게 처리하고자 할 때 사용)


// router
app.use('/score', scoreRouter);
app.use('/student', studentRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})
// 서버에러 처리
app.use((error, req, res, next) => {
    console.log(error)
    res.sendStatus(500)
});


// 연결확인을 위한 출력하는 부분은 주석처리하고, 서버를 sequelize 안으로 이동
app.listen(config.host.port);

