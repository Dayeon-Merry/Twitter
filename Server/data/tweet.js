import express from 'express';
import * as userRepository from './auth.js';

let tweets = [
    {
        // 트윗 정보
        id: '1', // 트윗의 글 번호
        text: '첫 트윗입니다!!',
        createdAt: Date.now().toString(),
        // 사용자 정보: 계정을 만들어서 회원정보 수정할 경우, 계정 데이터와 트윗에 있는 데이터가 따로 논다. 
        userId: '1' //계정의 identity한 번호.
    },
    {
        id: '2',
        text: '안녕하세요!!',
        createdAt: Date.now().toString(),
        userId: '1'
    }
];

export async function getAll(){
    return Promise.all(
        tweets.map(async (tweet) => {
            const {username, name, url} = await userRepository.findById(tweet.userId);
            return {...tweet, username, name, url};
        })
    );
}

export async function getAllByUsername(username) {
    return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username))
}

export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found){
        return null;
    }
    const { username, name, url } = await userRepository.findById(found.userId);
    return {...found, username, name, url}; //객체로 묶어서 return
}

//트윗의 id를 뽑아서 확인하고 return 
export async function create(text, userId) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        userId
    };
    tweets = [tweet, ...tweets];
    return getById(tweet.id);
}
// 글을 쓴 사람인지 알아야하는게 우선이다.
export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => {
        tweet.id !== id // 삭제할 녀셕 빼고 나머지를 다 담는것
    })
}