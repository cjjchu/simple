var p1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 3000, "first");
});
var p2 = new Promise(function (resolve, reject) {
  resolve('second');
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "third");
});

Promise.all([p1, p2, p3]).then(function(values) {
  console.log(values);
});
