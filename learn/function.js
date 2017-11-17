function fn(){

  var num = 0;

  for(var i = 0; i < arguments.length; i++){

    num += arguments[i];

  }
  console.log(num);
}

fn(1,2,3,4,5,6);
