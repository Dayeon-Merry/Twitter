import express from 'express'

let tweets = [
    {
        id: '1',
        text: '첫 트윗입니다!!',
        createdAt: Date.now().toString(),
        name: 'apple',
        username: '김사과',
        url: ''
    },
    {
        id: '2',
        text: '안녕하세요!!',
        createdAt: Date.now().toString(),
        name: 'banana',
        username: '반하나',
        url: ''
    }
];

const router = express.Router();
// GET
// /tweet? username=:username, 닉네임 찾아서 리턴
router.get('/', (req, res, next) => {
    const username = req.query.username; // 값을 받아와서 저장
    const data = username
        ? tweets.filter((tweet) => tweet.username === username): tweets;
    res.status(200).json(data)
})

// GET
// /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet) {
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
})
// 하나만 찾는거니까 filter가 아닌 find를 씀

// POST
// id: Date.now().toString()
// router.use(express.json())
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
     //body에서 입력받은 값을 불러와서 변수에 넣겠다.
    const tweet = {
        id: Date.now().toString(),
        text, // text:text
        createdAt: new Date(),
        name,
        username
    };
    tweets = [tweet, ...tweets]; 
    // 배열을 만들고 복사로 추가 (메모리에있는 객체를 복사해오고, tweet을 저장해놓고 가리키게 함, 새로운걸 하나 만들어서 옮기는 것)
    res.status(201).json(tweet);
})

// PUT(수정)
// "text"만 수정
router.put('/:id', (req, res, next) => {
    const id = req.params.id; // 수정할 id 번호를 저장
    const text = req.body.text
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        tweet.text = text;
        res.status(201).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }

})

//DELETE
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((tweet) => {
        tweet.id !== id // 삭제할 녀셕 빼고 나머지를 다 담는것
    })
    res.sendStatus(204); // 정상적으로 되었다면 코드번호를 204로 보내겠다.
}) // 실행 후 GET으로 id로 1번({{base}}/tweets/1)을 찾아보면 아무것도 안나온다.
export default router;

