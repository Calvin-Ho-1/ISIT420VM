let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");

// start by creating data so we don't have to type it in each time
let ServerOrderArray = [];

// define a constructor to create movie objects
let OrderObject = function (pStoreID, pSalesPersonID, pCdID, pPricepaid, pDate) {
    this.storeID = pStoreID  // tiny chance could get duplicates!
    this.salesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.pricePaid = pPricepaid;  
    this.date = pDate;
}

const mongoose = require("mongoose");

const OrderSchema = require("../orderSchema");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection is in (MoviesDB)
const dbURI =
  // "mongodb+srv://bcuser:bcuser@cluster0.nbt1n.mongodb.net/MoviesDB?retryWrites=true&w=majority";
  "mongodb+srv://BCuser:BCuser@calvincluster.vhr9aob.mongodb.net/OrderSchema?retryWrites=true&w=majority";
  // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.

mongoose.set('useFindAndModify', false);


const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 100
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.post('/SubmitOrder', function(req, res) {
  // find {  takes values, but leaving it blank gets all}
  let oneNewOrder = new OrderSchema(req.body);  
  console.log(req.body);
  oneNewOrder.save((err, AllOrders) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
    console.log(AllOrders);

    var response = {
      status  : 200,
      success : 'Added Successfully'
    }
    res.end(JSON.stringify(response)); // send reply

    }
  });
});

// router.post('/SubmitOrder', function(req, res) {
//   // find {  takes values, but leaving it blank gets all}
//   OrderSchema.find({}, (err, AllOrders) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//     res.status(200).json(AllOrders);
//     console.log(AllOrders)
//   });
// });


//New

router.get('/getSalesPerCd', function(req, res){
  OrderSchema.aggregate([
      // { $match : {CdID: {$gt: 0, $lt: 654321}} } ,

      {$group: { _id: "$CdID", totalPrice: { $sum: "$PricePaid" } } },


      { $sort: {totalPrice: -1}  }

    ])

    

      .exec(function (err, AllOrders) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.status(200).json(AllOrders);
        console.log(AllOrders)
      });
});

router.get('/orderTotalsByStore', function(req, res){
  OrderSchema.aggregate([
      {$group: { _id: "$StoreID", totalSalesQuantity: { $sum: "$PricePaid" } } },


      { $sort: {totalSalesQuantity: -1}  }

    ])

      .exec(function (err, AllOrders) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        res.status(200).json(AllOrders);
        console.log(AllOrders)
      });
      
});



/* GET all Movie data */
// router.get('/getAllMovies', function(req, res) {
//   // find {  takes values, but leaving it blank gets all}
//   MovieSchema.find({}, (err, AllMovies) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//     res.status(200).json(AllMovies);
//   });
// });

// router.get('/getAllDramaMovies', function(req, res) {
//   let which = "drama";
//   MovieSchema.find({Genre: which,  Year: { $gt: 1971, $lt: 1996} }).sort({ Year: -1}).exec(function(err, AllMovies) {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//     console.log(AllMovies);
//     res.status(200).json(AllMovies);
//   });
// });


// router.post('/SubmitOrder', function(req, res) {
//   const order = req.body;  // get the object from the req object sent from browser
//   console.log("Order: ", order);
//   ServerOrderArray.push(order);  // add it to our "DB"  (array)
//   fileManager.write();
//   // prepare a reply to the browser
//   var response = {
//     status  : 200,
//     success : 'Added Successfully'
//   }
//   res.end(JSON.stringify(response)); // send reply
// });


// my file management code, embedded in an object
// fileManager  = {

//   // this will read a file and put the data in our movie array
//   // NOTE: both read and write files are synchonous, we really can't do anything
//   // useful until they are done.  If they were async, we would have to use call backs.
//   // functions really should take in the name of a file to be more generally useful
//   read: function() {
//     // has extra code to add 4 movies if and only if the file is empty
//     const stat = fs.statSync('ordersData.json');
//     if (stat.size !== 0) {                           
//     var rawdata = fs.readFileSync('ordersData.json'); // read disk file
//     ServerOrderArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
//     }

//   },
  
//   write: function() {
//     let data = JSON.stringify(ServerOrderArray);    // take our object data and make it writeable
//     fs.writeFileSync('ordersData.json', data);  // write it
//   },
// }



module.exports = router;
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



