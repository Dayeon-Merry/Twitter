import MongoDb from 'mongodb'; 
// import { getTweet } from '../controller/tweet.js';
import { getTweets } from '../db/database.js'
import * as UserRepository from './auth.js'

const ObjectId = MongoDb.ObjectId

// RDMS와 nosequel과 차이점.. 스키마 유무,,,
// nosequel도 스키마를 relational하게 만들 수 있는 방법이 있다..하지만 굳이 본연의 특징을 죽여가면서 쓸 필요가 없다. RDBMS 기능이 필요하다면 DBMS 서버를 여러개 두고 필요에 맞게 쓰면됨




export async function getAll(){
    return getTweets()
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets)
    // createdAt: -1 내림차순
    // 배열로 바꿔줄 필요가 있음 = .toArray()
}


export async function getAllByUsername(username) {
    return getTweets()
    .find({username})
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets)
}

export async function getById(id) {
    return getTweets()
    .find({ _id: new ObjectId(id) })
    .next()
    .then(mapOptionalTweet)
}


//트윗의 id를 뽑아서 확인하고 return 
export async function create(text, userId) {
    return UserRepository.findById(userId)
    .then((user) => getTweets().insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url
        // 매번 사용자 정보(user.객체 내 정보)를 트윗에 같이 저장
    })).then((result) => console.log(result)).then(mapOptionalTweet)
}

export async function update(id, text) {
    return getTweets().findOndAndUpdate(
        {_id: new ObjectId(id) },
        { $set: { text } },
        { returnOriginal: false}
    )
    .then((result)=> result.value)
    .then(mapOptionalTweet)
}

export async function remove(id) {
    return getTweets().deleteOne({ _id: new ObjectId(id)})
}

function mapOptionalTweet(tweet){
    return tweet ? { ...tweet, id: tweet._id.toString()} : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet)
}