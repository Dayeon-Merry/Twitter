import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

// 몽고DB를 채우는 스키마가 존재하지 않지만, 스키마를 만들어서 쓰는 것
const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    url: String
})

useVirtualId(userSchema);
// 컬렉션 이름 만들기(users),userSchema의 형태로 컬랙션이 만들어 지고 User가 그것을 가리킴 
const User = Mongoose.model('User', userSchema)

// 데이터가 추가될때마다 객체가 저장되듯 저장됨
// PK나 유니크 제한조건이 없기 때무넹 동일한 컬럼이 들어갈수도있는데, 삭제하게되면 중복된 값들이 다 삭제된다.
// .next() 직전 코드가 처리되면 then을 처리하고 아니면 then을 처리하지 않기 위함

export async function findByUsername(username) {
    return User.findOne({ username })

}

export async function createUser(user) {
    return new User(user).save().then((data) => data.id)
}

export async function findById(id) {
    return User.findById(id)
}

// 유저 객체가 있으면 스트링으로 리턴
function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user;
} // _id는 object id
