var axios = require('axios');

axios.get('http://localhost:8500/api/posts/')/* {
    body: 'some body once told me',
    author: 1,
    title: 'u are the sharpest tool'
})*/
.then(res => console.log(res))
.catch(err => console.log(err));
