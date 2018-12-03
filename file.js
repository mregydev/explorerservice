var fs=require('fs')


var readFile=require('util').promisify(fs.readFile)


 var res= fs.readFileSync('users.json')

 console.log(res.toString())
