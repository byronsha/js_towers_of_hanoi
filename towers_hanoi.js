var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.stacks = [[3,2,1],[],[]];
}

HanoiGame.prototype.isWon = function () {
  if (this.stacks === [[],[3,2,1],[]] || this.stacks === [[],[],[3,2,1]]) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var startTower = this.towers[startTowerIdx];
  var endTower = this.towers[endTowerIdx];

  if (startTower.length === 0) {
    return false;
  } else if (endTower.length === 0) {
    return true;
  } else {
    var topStartDisc = startTower[startTower.length - 1];
    var topEndDisc = endTower[endTower.length - 1];
    return topStartDisc < topEndDisc;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function(callback) {
  this.print();
  reader.question("Tower from? ", function(fromm) {
    var fromTower = parseInt(fromm);
    reader.question("Tower to? ", function(to) {
      var toTower = parseInt(to);
      callback(fromTower, toTower);
    });
  });
};

// HanoiGame.prototype.run = function(completionCallback) {
//   this.promptMove(function(fromTower, toTower) {
//     if (!this.move(fromTower, toTower)) {
//       console.log("Invalid move!");
//     }
//
//     if (!this.isWon()) {
//       this.run(completionCallback);
//     } else {
//       this.print();
//       console.log("You win!");
//       completionCallback();
//     }
//   }).bind(this);
// };

HanoiGame.prototype.run = function (gameCompletionCallback) {
  this.promptMove((function (startTowerIdx, endTowerIdx) {
    if (!this.move(startTowerIdx, endTowerIdx)) {
      console.log("Invalid move!");
    }

    if (!this.isWon()) {
      // Continue to play!
      this.run(reader, gameCompletionCallback);
    } else {
      this.print();
      console.log("You win!");
      gameCompletionCallback();
    }
  }).bind(this));
};

var newGame = new HanoiGame();

newGame.run(function() {
  console.log("You win!");
  reader.close();
});
