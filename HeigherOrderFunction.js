/*
let fun = function (msg) {
  return function (name) {
    console.log(`${msg} ${name}`);
  }
};

// fun("How are you,")("sas?"); //this is another way to execute the function

//But, the below method is mostly practiced...
let fun1=fun("How are you,");
fun1("sas?");
*/


/*
//IIFE= Immediately Invoked Function Expression

(function () {
  console.log(
    "To invove the function wrape the whole expression in () and call it with another () right after it..."
  );
})();
// arguements can be passed too..
(function (name) {
  console.log(`The arg is ${name}`);
})("hellow");
*/


/*
function makeFfun() {
    const name="firefox";
    function display() {
        console.log(name);
    }
    console.log("okay...");//this will execute first then go to the next line
    return display;
}

const func=makeFfun();
func();
*/
