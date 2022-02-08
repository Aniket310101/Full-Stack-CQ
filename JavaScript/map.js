var a = [1, 2, 3, 4];

function fun(data, index){
    return data*2;
}

var b = a.map(fun);
console.log(b);