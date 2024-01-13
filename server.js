const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log(req);
    //res.send('Hello World!');
});
app.post('/requestMap', (req, res) => {
    res.sendFile(__dirname+"/img/map.jpg");
});



const mapSize=[512,512];

const generateMap=()=>{
    let data = new Uint8Array(mapSize[0]*mapSize[1]*3);
    for(var i=0;i<data.length;i+=3) {
        data[i]=0;
        data[i+1]=0;
        data[i+2]=0;
    }
    data = Buffer.from(data);
    fs.writeFile(`img/test.jpg`, data, err => { // Assets is a folder present in your root directory
      if (err) {
            console.log(err);
        } else {
            console.log('File created successfully!');
        }
    }); 
};

generateMap();












app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));