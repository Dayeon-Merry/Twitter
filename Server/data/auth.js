import { getUsers } from '../db/database.js';
import MongoDb from 'mongodb';

// 데이터가 추가될때마다 객체가 저장되듯 저장됨
const ObjectId = MongoDb.ObjectId;
// PK나 유니크 제한조건이 없기 때무넹 동일한 컬럼이 들어갈수도있는데, 삭제하게되면 중복된 값들이 다 삭제된다.

//findOne(WHERE 조건)은 딱하나만 찾을때. 
export async function findByUsername(username) {
    return getUsers().find({username})
    .next() // 직전 코드가 처리되면 then을 처리하고 아니면 then을 처리하지 않기 위함
    .then(mapOptionalUser)

}

export async function createUser(user){

    return getUsers().insertOne(user)
    .then((result) => {
        console.log(result);
        // result.ops[0]._id.toString()
    })
    //.insertOne() 데이터를 하나만 집어넣겠다.
    // 객체형태를 받아서 그대로 집어넣음
}

export async function findById(id){
    console.log(id.length)
    return getUsers()
    .find({ _id: new ObjectId(id)})
    .next()
    .then(mapOptionalUser)
}
// 유저 객체가 있으면 스트링으로 리턴
function mapOptionalUser(user) {
    return user? { ...user, id: user._id.toString() } : user;
} // _id는 object id
