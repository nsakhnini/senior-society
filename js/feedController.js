window.onload = function (ev) {
    var comment1 = document.getElementById("commentButton1");
    var txt1 = document.getElementById("commentText1").innerText;
    console.log(txt1);
    comment1.addEventListener("click", function (txt1) {
        console.log("click");
        if(txt1 != null && txt1 != ""){
            addComment(txt1, "post1");
        }
    });
    var comment2 = document.getElementById("commentButton2");
    var txt2 = document.getElementById("commentText2").innerText;
    comment2.addEventListener("click", function (txt2) {
        if(txt2 != null && txt2 != ""){
            addComment(txt2, "post2");
        }
    });
    var comment3 = document.getElementById("commentButton3");
    var txt3 = document.getElementById("commentText3").innerText;
    comment3.addEventListener("click", function (txt3) {
        if(txt3 != null && txt3 != ""){
            addComment(txt3, "post3");
        }
    });
};
var addComment = function (text , id) {
    if(text != '') {
        var whereto = document.getElementById(id);
        var row = document.createElement("div");
        row.setAttribute("class", "w3-cell-row");
        row.style.paddingLeft = "20px";
        var innerCell1 = document.createElement("div");
        innerCell1.setAttribute("class", "w3-cell");
        innerCell1.style.width = "10%";
        var image = document.createElement("img");
        image.setAttribute("class", "w3-circle");
        image.style.width = "100%";
        image.src = "https://specials-images.forbesimg.com/imageserve/59d5062131358e542c034eb7/416x416.jpg?background=000000&cropX1=419&cropX2=1409&cropY1=53&cropY2=1044";
        innerCell1.appendChild(image);
        var innerCell2 = document.createElement("div");
        innerCell2.setAttribute("class", "w3-cell w3-container");
        var name = document.createElement("h3");
        name.style.fontSize = "20px";
        name.innerText = "Me";
        var commentBody = document.createElement("p");
        commentBody.style.fontSize = "15px";
        commentBody.innerText = text;
        innerCell2.appendChild(name);
        innerCell2.appendChild(commentBody);
        row.appendChild(innerCell1);
        row.appendChild(innerCell2);
        whereto.appendChild(row);
    }
};