const http = require('http');
const url = require('url'); // url 모듈 로딩

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // 패스명 할당
    // res.setHeader("Content-Type", "text/html"); // charset이 설정되지 않아 한글이 깨진다.
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (path in urlMap) {
        urlMap[path](req, res);
    } else {
        notFound(req, res);
    }
}).listen('3000', () => console.log('라우터를 만들어보자!'));

const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query; //  쿼리 스트링 데이터를 userInfo에 할당
    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`); // /user 결괏값 설정

    // http://localhost:3000/user?name=%ED%9E%98%EC%B0%AC&age=30
};

const feed = (req, res) => {
    res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3 한글</li>
    </ul>`);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end('404 page not found');
};

/*
    if (path === '/user') {
        user(req, res)
    } else if (path === '/feed') {
        feed(req, res)
    } else {
        notFound(req, res)
    }

    - 위 처럼 분기문에서 모든 요청을 분기한다면, 만약 함수의 개수가 늘어날수록 유지보수하기가 매우 힘들다.
    - 분기문에서 사용되는 매개변수가 같은 패턴을 보일 때는 맵 자료구조가 유용하다.

*/

const urlMap = {
    '/': (req, res) => res.end('HOME'),
    '/user': user,
    '/feed': feed,
};
