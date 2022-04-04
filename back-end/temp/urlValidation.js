// if (
//   !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
//     longUrl
//   )
// ) {
//   return res
//     .status(400)
//     .send({ status: false, message: `This is not a valid Url` });
// }

// if (
//   (longUrl.includes('https://') &&
//     longUrl.match(/https:\/\//g).length !== 1) ||
//   (longUrl.includes('http://') &&
//     longUrl.match(/http:\/\//g).length !== 1) ||
//   (longUrl.includes('ftp://') && longUrl.match(/ftp:\/\//g).length !== 1)
// ) {
//   return res.status(400).send({ status: false, msg: 'Url is not valid' });
// }

// if (!/(.com|.org|.co.in|.in|.co|.us)/.test(longUrl)) {
//   return res.status(400).send({ status: false, msg: 'Invalid url' });
// }

// if (
//   longUrl.includes('w') &&
//   (longUrl.indexOf('w') === 6 ||
//     longUrl.indexOf('w') === 7 ||
//     longUrl.indexOf('w') === 8)
// ) {
//   let arr = [];
//   let i = longUrl.indexOf('w');
//   while (longUrl[i] == 'w') {
//     if (longUrl[i] === 'w') {
//       arr.push(longUrl[i]);
//     }
//     i++;
//   }

//   if (!(arr.length === 3)) {
//     return res.status(400).send({ status: false, msg: 'Url is not valid' });
//   }
// }
