let url ="https://www.instagram.com/art__ddo/";
let articles;
let imgSrcs = [];
var wrapper= document.createElement('html');

$.get(url, function(data, status){
    wrapper.innerHTML = data;
    console.log(wrapper);
    articles = wrapper.getElementsByTagName("article");
    console.log(articles);
    for(let i=0; i<articles.length ; i++){
        imgSrcs.push(articles[i].getElementsByTagName("img")[1].src);
        console.log(imgSrcs);

    }
    
 //   console.log(imgSrcs);
});


