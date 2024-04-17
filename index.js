import request from 'request';
import express from 'express';
import fetch from "node-fetch";
var app = [];
var port = [];
async function create(){
var fetching = await fetch("https://www.proxy-list.download/api/v1/get?type=http");
var content = await fetching.text();
var array = await content.split("\n");
for(var i = 0; i < array.length; i++){
array[i] = array[i].slice(0, array[i].length - 1);
}
console.log(array);
for(var i = 0; i < array.length; i++){
    app[i] = express();
    app[i].all("/*", (req, res) => {
        request({
            url: "https://surfdoge.pro" + req.url,
            proxy: array[i]
        }).pipe(res);
    });
    port[i] = 8000 + i;
    app[i].listen(port[i], function(err){
        if (err) console.log(err);
        console.log("monkey", port[i]);
     });
}
}
create();
