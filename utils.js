const fs = require('fs');

const addFileToData = (path, content) => {
    fs.writeFileSync(path, JSON.stringify(content), 'utf8', (err)=>{
        if(err){
            console.log(err)
        }
    })
}

const postPutHelper = (req)=>{
    return new Promise ((res, rej)=>{
        try {
            let body = '';
            req.on('data',(chunk)=>{
                body += chunk.toString();
            })
            req.on('end', ()=>{
                res(body)
            })
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = {
    addFileToData,
    postPutHelper
}