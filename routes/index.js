let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");

// start by creating data so we don't have to type it in each time
let ServerOrderArray = [];

// define a constructor to create movie objects
// let OrderObject = function (pStoreID, pSalesPersonID, pCdID, pPricepaid, pDate) {
//     this.storeID = pStoreID  // tiny chance could get duplicates!
//     this.salesPersonID = pSalesPersonID;
//     this.CdID = pCdID;
//     this.pricePaid = pPricepaid;  
//     this.date = pDate;
// }

// my file management code, embedded in an object
fileManager  = {

  // this will read a file and put the data in our movie array
  // NOTE: both read and write files are synchonous, we really can't do anything
  // useful until they are done.  If they were async, we would have to use call backs.
  // functions really should take in the name of a file to be more generally useful
  read: function() {
    // has extra code to add 4 movies if and only if the file is empty
    const stat = fs.statSync('ordersData.json');
    if (stat.size !== 0) {                           
    var rawdata = fs.readFileSync('ordersData.json'); // read disk file
    ServerOrderArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
    }
    // else {
    //   // make up 3 for testing
    //   ServerOrderArray.push(new OrderObject("Moonstruck", 1981, "Drama"));
    //   ServerOrderArray.push(new OrderObject("Wild At Heart", 1982, "Drama"));
    //   ServerOrderArray.push(new OrderObject("Raising Arizona", 1983, "Comedy"));
    //   ServerOrderArray.push(new OrderObject("USS Indianapolis", 2016, "Drama"));
    //   fileManager.write();
    // }
  },
  
  write: function() {
    let data = JSON.stringify(ServerOrderArray);    // take our object data and make it writeable
    fs.writeFileSync('ordersData.json', data);  // write it
  },
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.post('/SubmitOrder', function(req, res) {
  const order = req.body;  // get the object from the req object sent from browser
  console.log("Order: ", order);
  ServerOrderArray.push(order);  // add it to our "DB"  (array)
  fileManager.write();
  // prepare a reply to the browser
  var response = {
    status  : 200,
    success : 'Added Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

// /* GET all Movie data */
// router.get('/getAllMovies', function(req, res) {
//   fileManager.read();
//   res.status(200).json(ServerOrderArray);
// });


// /* Add one new Movie */
// router.post('/AddMovie', function(req, res) {
//   const newMovie = req.body;  // get the object from the req object sent from browser
//   console.log(newMovie);
//   ServerOrderArray.push(newMovie);  // add it to our "DB"  (array)
//   fileManager.write();
//   // prepare a reply to the browser
//   var response = {
//     status  : 200,
//     success : 'Added Successfully'
//   }
//   res.end(JSON.stringify(response)); // send reply
// });

// delete movie

// router.delete('/DeleteMovie/:ID', (req, res) => {
//   const ID = req.params.ID;
//   let found = false;
//   console.log(ID);    

//   for(var i = 0; i < ServerOrderArray.length; i++) // find the match
//   {
//       if(ServerOrderArray[i].ID === ID){
//         ServerOrderArray.splice(i,1);  // remove object from array
//           found = true;
//           fileManager.write();
//           break;
//       }
//   }

//   if (!found) {
//     console.log("not found");
//     return res.status(500).json({
//       status: "error"
//     });
//   } else {
//     var response = {
//       status  : 200,
//       success : 'Movie ' + ID + ' deleted!'
//     }
//     res.end(JSON.stringify(response)); // send reply
//   }
// });


module.exports = router;
