import * as tweetRepository from '../data/tweet.js'



export async function getTweets(req, res) {
    const username = req.query.username; // 값을 받아와서 저장
    const data = await (username
    ? tweetRepository.getAllByUsername(username): tweetRepository.getAll());
    res.status(200).json(data)
}

export async function getTweet(req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id)
    if(tweet) {
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
}

export async function createTweet(req, res, next) {
    const { text, name, username } = req.body;
    //body에서 입력받은 값을 불러와서 변수에 넣겠다.
    const tweet = await tweetRepository.create(text, name, username)
    // 배열을 만들고 복사로 추가 (메모리에있는 객체를 복사해오고, tweet을 저장해놓고 가리키게 함, 새로운걸 하나 만들어서 옮기는 것)
    res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
    const id = req.params.id; // 수정할 id 번호를 저장
    const text = req.body.text
    const tweet = await tweetRepository.update(id, text)
    if(tweet){
        res.status(201).json(tweet)
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
}

export async function deleteTweet(req, res, next) {
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204); // 정상적으로 되었다면 코드번호를 204로 보내겠다.
}