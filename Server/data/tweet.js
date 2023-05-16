import Mongoose from 'mongoose'; 
import { useVirtualId } from '../db/database.js'
import * as UserRepository from './auth.js'

const tweetSchema = new Mongoose.Schema({
    text: { type:String, required: true},
    userId: { type:String, required: true},
    name: { type:String, required: true},
    username: { type:String, required: true},
    url: String
},
{ timestamps: true }) //두개의 timestamp 추가됨

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

// RDMS와 nosequel과 차이점.. 스키마 유무,,,
// nosequel도 스키마를 relational하게 만들 수 있는 방법이 있다..하지만 굳이 본연의 특징을 죽여가면서 쓸 필요가 없다. RDBMS 기능이 필요하다면 DBMS 서버를 여러개 두고 필요에 맞게 쓰면됨

export async function getAll(){
    return Tweet.findOne().sort({ createAt: -1 });
}
// createAt: -1 : 내림차순
export async function getAllByUsername(username) {
    return Tweet.find({ username}).sort({ createAt: -1 });
}

export async function getById(id) {
    return Tweet.findById(id);
}


//트윗의 id를 뽑아서 확인하고 return 
export async function create(text, userId) {
    return UserRepository.findById(userId)
    .then((user) => new Tweet({
        text,
        userId,
        name: user.name,
        username: user.username,
    }).save()
    )
}

export async function update(id, text) {
    return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false })
}
//returnOriginal: false  - 원래 데이터를 보여줄 필요 없다.
export async function remove(id) {
    return Tweet.findByIdAndDelete(id)
}

