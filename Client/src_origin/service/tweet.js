export default class TweetService {
  // 네트워크를 통해 데이터 가져오기
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;

  }

  async getTweets(username) {
    // fetch 메소드를 통해 /tweets?username=:username
    const query = username? `?username=${username}`:'';
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: this.getHeaders() // headers에 담아서 토큰값 전달
    });
  }

  async postTweet(text) {
    // fetch를 통해 /tweets post로 입력한 데이터를 전송
    return this.http.fetch(`/tweets`, {
      method:"POST",
      headers: this.getHeaders(),
      body: JSON.stringify({text, username: '김사과', name:'apple'})
  })
}

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {method: 'DELETE',
    headers: this.getHeaders()
  })
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({text})})
    }

    // 토큰을 꺼낼 수 있게하는 함수 -> fetch를 이용해서 API로 접근할 때 토큰을 이용할 수 있음(Headers에 넣어야 함)
    getHeaders(){
      const token = this.tokenStorage.getToken()
      return {
        Authorization: `Bearer ${token}` // headers에 넣을 값
      }
    }
}

