// var util=require('util')
// var str = '*....DSNXVCAR12/23/1200.50   ....*';
//
// var arr = str.split('');
//
// arr1=arr.splice(5,8);
// console.log("arr splice:"+arr1)
// var s=JSON.stringify(arr1)
// console.log("s:"+s)
//
// var reg = /\[/;
// var res = s.replace(s, '');
// console.log("s result :"+res);//
//
//
//
// var str = JSON.stringify(arr);// 这样也能转化为字符串但现在还是数组的形式不过类型已经是字符串了；
//
// var arr2 = JSON.parse(str);// 这样就是把字符串解析 其实就是把外面的中括号去掉；
//
// console.log(arr2);

function getmoudlestringasy(str) {
  str = '*..5.DSNURTHV05/13/13UK94247 .... *';
  let regt = /\/[0-9]+\//;
  // console.log(str.length);
  // console.log(regt.test(str));
  if (str.length === 35 && regt.test(str)) {
    let arr = str.split('');
    let md = arr.slice(5, 13);
    let ptf = arr.slice(21, 28);
    let result = {};
    // console.log('md:' + md + '\nptf:' + ptf + '\nstr:' + str);
    let reg = /[\[\],:\.\*"]/g;
    let res1 = JSON.stringify(md).replace(reg, '');
    let res2 = JSON.stringify(ptf).replace(reg, '');

    let modulereq = /^DSNU/g;
    var s = modulereq.test(res1);
    console.log(s);
    if (s) {
      console.log('-----------------------------------------====  module not suitable  =====');
    } else {

    }
    // let r = /^[A-Za-z]+/g;
    let r = /.*/;
    // console.log(r.test(res2));
    if (r.test(res2)) {
      result.MODULE = res1;
      result.PTFID = res2;
      console.log(result);
      return result;
    } else {
      console.log('\n\n====== ptf not suitable=====');
      return null;
    }
  } else {
    console.log('==========  no suitable  ========');
    return null;
  }
}

getmoudlestringasy();
