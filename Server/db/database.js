import { config } from '../config.js';
import Mongoose from 'mongoose';

export async function connectDB(){
    return Mongoose.connect(config.db.host);
}
// virtual(): 가상 필드 역할을 함 
export function useVirtualId(schema){
    schema.virtual('id').get(function() {
        return this._id.toString();
    })
    schema.set('toJSON', { vertuals: true }); // JSON으로 내보냄
    schema.set('toObject', { vertuals: true }); // 데이터를 Object로 다루겠다

}

// 몽고 DB는 테이블이라는 개념이 없다. 테이블과 유사하지만 데이터를 저장하는 묶음(컬렉션)이 있다. 나누라고 있는게 아니고, 데이터를 묶어주는 역할을 하라고 있는 것.
// 컬렉션 안에 자바스크립트의 오브젝트 형태로 저장됨
// 몽고 DB의 가장 큰 특징은 스키마가 없다는 것.
/* <예시>
student 
    {id: 1, name: "김사과"} 
    {id: 1, names: "김사과", gender: "여자"} --> 서로 다른 프로퍼티를 넣을 수 있어서 실수를 조심해야함(테이블형태 데이터와 다른점) */

export function getUsers(){
    return db.collection('users')
}

export function getTweets(){
    return db.collection('tweets')
}