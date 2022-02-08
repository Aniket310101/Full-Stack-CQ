// if less arguments are passed than the parameters in the function, then the function runs properly without any error.

function fun1(a, b, c){
    console.log(a, b, c);
}

fun1(23);

// We can also pass a function as a parameter inside another function.
function fun2(){
    console.log("Hello World!");
}

function fun3(value){
    value();
    // console.log(value);
}

fun3(fun2);
// fun3(fun2());