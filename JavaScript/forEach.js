var a = ['Hello', 'World', 'Earth', 'Planet'];
var b = ['Sam', 'has', 'gone'];

function fun(data, index){
    console.log(data, index);
}

//METHOD 1
a.forEach(fun);
b.forEach(fun);

// METHOD 2
// a.forEach(function(data, index){
//     console.log(data, index);
// })

