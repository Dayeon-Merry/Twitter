import * as userRepository from './auth.js';
import { db } from '../db/database.js';


// 기존 코드
// export async function getAll(){
//     return Promise.all(
//         tweets.map(async (tweet) => {
//             const {username, name, url} = await userRepository.findById(tweet.userId);
//             return {...tweet, username, name, url};
//         })
//     );
// }
const SELECT_JOIN = 'select t.id, t.text, t.createdAt, t.userid, u.username, u.name, u.email, u.url from tweets as t left outer join users as u on t.userid = u.id'
const ORDER_DESC = 'order by t.createdAt desc'

export async function getAll(){
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0])
}

export async function getAllByUsername(username) {
    return db.execute(`${SELECT_JOIN} WHERE u.username=? ${ORDER_DESC}`, [username]).then((result) => result[0])
}

export async function getById(id) {
    return db.execute(`${SELECT_JOIN} WHERE t.id=?`, [id]).then((result) => result[0][0])
}

//트윗의 id를 뽑아서 확인하고 return 
export async function create(text, userId) {
    return db.execute('insert into tweets (text, createdAt, userId) values (?, ?, ?)', [text, new Date(), userId]).then((result) => console.log(result));
}//getById(result[0].insertId)
// 글을 쓴 사람인지 알아야하는게 우선이다.

export async function update(id, text) {
    return db.execute('update tweets SET text=? where id=?', [text, id]).then(() => getById(id));
}

export async function remove(id) {
    return db.execute('delete from tweets where id=?', [id]);
}