const express = require("express") // express 가져오기
const redis = require("redis") // redis 가져오기
// 레디스 클라이언트 생성 
const client = redis.createClient({
    // host: 도커를 사용하지 않는 환경에서는 redis 서버가 작동하는 곳의 url 입력 ex) "https://redis-server.com"
    host: "redis-server", 
    port: 6379 // redis 기본 포트
}) 


const app = express(); // Creates an Express application. 

// 숫자는 0부터 시작합니다. 
client.set("number", 0);

app.get('/', (req, res) => {
    client.get("number", (err, number) => {
        // 현재 숫자를 가져온 후에 1씩 올려줍니다.
        client.set("number", parseInt(number) + 1);
        res.send("숫자가 1씩 올라갑니다. 숫자: " + number);
    })
});

app.listen(8080); // Listen for connections. port: 8080 
console.log("Server is running");