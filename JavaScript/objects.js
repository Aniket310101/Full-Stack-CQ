var a = { 
    name: "Aniket", 
    age: 21,
    education: ["10th", "12th", "Btech"]
};

console.log(a.name); //read

a.address = "Kolkata"; //create
console.log(a);

a.address = "Patna"; //update
console.log(a);

delete a.age;
console.log(a);

//Loop through an object
for(var key  in a){
    console.log(a[key]);
}


//print education using forEach

// function fun(a, b){
//     console.log(a);
// }

// a.education.forEach(fun);


//We can store nested objects and functions as well

var b = {
    name: "Rahul",
    clubs: {
        c1: "Club 1",
        c2: "Club 2",
    },

    getSum: function(v1, v2){
        return v1+v2;
    },
    fun1: function(){
        return `His name is ${this.name}`;
    }
};

// function sum(a, b){
//     return a+b;
// }

var ans = b.getSum(4, 5);
console.log(ans);

console.log(b.fun1());

console.log(b.clubs.c1);