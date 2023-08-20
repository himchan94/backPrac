const http = require('http');
const url = require('url'); // url 모듈 로딩

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // 패스명 할당
    // res.setHeader("Content-Type", "text/html"); // charset이 설정되지 않아 한글이 깨진다.
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (path === '/user') {
        res.end('[user] name : 힘찬, age: 30'); // /user 결괏값 설정
    } else if (path === '/feed') {
        res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3 한글</li>
    </ul>`);
    } else {
        res.statusCode = 404;
        res.end('404 page not found');
    }
}).listen('3000', () => console.log('라우터를 만들어보자!'));

// 프로덕션 레벨에서 사용하는 라우터는 더 복잡하다. 하지만 요청으로 들어온 정보를 분석해서 라팅하는 방법 자체는 같다.
