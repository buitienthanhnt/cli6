// let url = new URL('myapp://app/phpinfo?url=www.topsy-fashion.nl');
// console.log(url.searchParams.get('url'));

// let url = new URL('myapp://product_url=https://abc.com/product123');

var appId = 'com.jmango360.testing.vlisco';
str = 'com.jmango360.testing.vlisco://product_url=https://vlc.jmango360.dev/vls6hm0-011?___store=default';
// var myRe = /${appId}(:\/\/product_url|:\/\/category_url)=[a-z].*/g;
// var myArray = myRe.exec('com.jmango360.testing.vlisco://product_url=https://vlc.jmango360.dev/vls6hm0-011?___store=default');
var express = new RegExp(appId+'(:\/\/product_url|:\/\/category_url)=[a-z].*');
// console.log(express);
console.log(express.exec("com.jmango360.testing.vlisco://product_url=https://vlc.jmango360.dev/vls6hm0-011?___store=default"));
// console.log(myArray[0]);
// let str = myArray[0];
let value = str.replace(new RegExp(appId+'(:\/\/product_url|:\/\/category_url)='), "");
console.log('value:', value);
// console.log(url);