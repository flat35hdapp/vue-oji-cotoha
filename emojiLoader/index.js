'use strict';
const fs = require('fs');
const csvSync = require('csv-parse/lib/sync');
const main = () => {
  const file = 'emoji2.csv';
  let data = fs.readFileSync(file);
  let res = csvSync(data);
  const obj = {}
  let key,value
  res.forEach((item) => {
    key = item[0]
    value = item[1]
    obj[key] = value
  });
  console.log(obj)
  fs.writeFile('emoji2.json', JSON.stringify(obj, null, '    '),()=>{
    console.log("fs end")
  });
};
main()
