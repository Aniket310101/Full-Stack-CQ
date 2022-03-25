function compile(){
    var compile = document.querySelector("button");
    compile.addEventListener("click", function(){
        var e = document.querySelector("#lang-select")
        // console.log(typeof e.value);

        compileClicked(e.value);
    });
}


function compileClicked(langid){
    var codetext = document.querySelector("#codeText").value;

    // console.log( typeof codetext);

    var request = new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    request.send(JSON.stringify({ code : codetext , langId : langid}))

    request.addEventListener("load", function(event){
        var codeid = JSON.parse(event.target.responseText);
        console.log(codeid);

    })
}

compile();