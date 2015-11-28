"use strict";

function Clock () {
  this.currentDate = new Date();
  this.seconds = this.currentDate.getSeconds();
  this.minutes = this.currentDate.getMinutes();
  this.hour = this.currentDate.getHours();
  setTimeout(this._tick.bind(this), 1000);
}

Clock.prototype.printTime = function () {
  console.log("hour: " + this.hour + " minutes: " + this.minutes +
          " seconds: " + this.seconds);
};

Clock.prototype._tick = function () {
  this.seconds += 1;
  if (this.seconds === 60) {
    this.minutes += 1;
    this.seconds = 0;
  }
  if (this.minutes === 60) {
    this.hour += 1;
    this.minutes = 0;
  }
  this.printTime();
  setTimeout(this._tick.bind(this), 1000);
};

var clock = new Clock();

var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft === 0) {
    reader.close();
    return;
  }
  var total = sum;
  reader.question("Enter a number: ", function(answer) {
    total += parseInt(answer);
    console.log("Current Sum: " + parseInt(total));
    addNumbers(total, numsLeft - 1, completionCallback);
  });
}

function addNumbersIt(sum, numsLeft, completionCallback) {
  var total = sum;
  for (var i = 0; i < numsLeft; i++) {
    reader.question("Enter a number: ", function(answer) {
      total += answer;
      console.log("Current Sum: " + parseInt(total));
      reader.close();
    });
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});

addNumbersIt(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});


var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question("Is " + el1 + " greater than " + el2 +
      "? ", function(answer) {
    if (answer === "yes") {
      return callback(true);
    }
    else if (answer === "no") {
      return callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
  // console.log(arr);
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      if (isGreaterThan) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      } else {
        madeAnySwaps = false;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if `madeAnySwaps` is true, else call
    // `sortCompletionCallback`.
    // if (madeAnySwaps === false) {
    //   // return arr;
    //   console.log("hi")
    // }

    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, madeAnySwaps, outerBubbleSortLoop);
    } else {

      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});

Function.prototype.myBind = function (context) {
  var fn = this;
  var abc = function() {
    return fn.apply(context);
  };
  return abc;
};

function Cat(name) {
  this.name = name;
  this.type = "Cat";
}

function Dog(name) {
  this.name = name;
  this.type = "Dog";
}

Cat.prototype.meow = function() {
  console.log(this.type +"<-- this is my this");
  return "Hello";
};

var ca = new Cat("Fluffy");
var dg = new Dog("Spot");

var bound = ca.meow.myBind(dg);
console.log(bound());
