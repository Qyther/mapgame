var c,ctx;

const postJSON=(url,body,cb)=>{
    fetch(url,{
      method:"POST",
      headers:{"Content-Type":"application/json"}, 
      body:body
    }).then(cb).catch(()=>{});
};
  
//   async function postJSONAsync(url,data,cb) {
//     try {
//       const response = await fetch(url, {
//         method: "POST", // or 'PUT'
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: data,
//       });
  
//       cb(response);
//     } catch(e) {}
// }

const mapSize=[512,512];
const mapPosition=[0,0];
var mapImage=new Image();

const updateMapImage=()=>{
    postJSON("/requestMap",{cache:"reload",mode:"no-cors"},async res=>await res.blob().then(blob=>{
        let img=URL.createObjectURL(blob);
        mapImage.src=img;
    }));
};

var imData;

const frame=()=>{
    c=document.getElementsByClassName("mapCanvas")[0];
    [c.width,c.height,ctx]=[innerWidth,innerHeight,c.getContext("2d")];
    //-=-//
    // ctx.drawImage(mapImage,mapPosition[0],mapPosition[1]);
    if(!imData) {
        imData=ctx.createImageData(mapSize[0],mapSize[1]);
        for(var i=0;i<imData.data.length;i+=4) {
            imData.data[i]=0;
            imData.data[i+1]=0;
            imData.data[i+2]=0;
            imData.data[i+3]=255;
        }
    }

    ctx.putImageData(imData,0,0);
    //-=-//
    requestAnimationFrame(frame);
};

addEventListener("load",()=>{
    requestAnimationFrame(frame);
    updateMapImage();
});