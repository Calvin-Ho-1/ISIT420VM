const storeIDArray = [98053 , 98007, 98077, 98055, 98011, 98046];
const cdIDArray = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];

let orderObject = function (pStoreID, pSalesPersonID, pCdID, pPricepaid, pDate) {
    this.storeID = pStoreID  
    this.salesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.pricePaid = pPricepaid;  
    this.date = pDate;
}

 document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("createBtn").addEventListener("click", function(){
        console.log("Created");
        CreateOneOrder();
    })

    document.getElementById("submitOneBtn").addEventListener("click", function(){
        console.log("Submitted Button");
        SubmitOneOrder();
    })

    document.getElementById("submit500Btn").addEventListener("click", function(){
        Submit500Orders();
        
    })
    //let orderObject.date = ; 
});


let currentTime = new Date();

function CreateOneOrder(){
    
    let storePoint = Math.floor(Math.random() * storeIDArray.length);
    let randomstoreID = storeIDArray[storePoint];
    
    let salesPersonPointer =  (Math.floor(Math.random() * 4)) + 1;
    let salesPersonID = (storePoint * 4) + salesPersonPointer;
    
    let cdID = cdIDArray[Math.floor(Math.random() * cdIDArray.length)];

    let PricePaid = Math.floor(Math.random() * 15) + 5;

    let date = currentTime.toLocaleString();

    document.getElementById("storeID").value = randomstoreID;
    document.getElementById("salesPersonID").value = salesPersonID;
    document.getElementById("cdID").value = cdID;
    document.getElementById("pricePaid").value = PricePaid;
    document.getElementById("date").value = date;

    
    // let randomcdID = Math.floor(Math.random());
};

function SubmitOneOrder(){
    
    CreateOneOrder();


    let Order = new orderObject(
        document.getElementById("storeID").value,
        document.getElementById("salesPersonID").value,
        document.getElementById("cdID").value,
        document.getElementById("pricePaid").value,
        document.getElementById("date").value
    );

    let newRow = document.createElement("tr");

    let storeIDCell = document.createElement("td");
    storeIDCell.innerHTML = Order.storeID;
    newRow.appendChild(storeIDCell);
    
    let salesPersonIDCell = document.createElement("td");
    salesPersonIDCell.innerHTML = Order.salesPersonID;
    newRow.appendChild(salesPersonIDCell);
    
    let cdIDCell = document.createElement("td");
    cdIDCell.innerHTML = Order.CdID;
    newRow.appendChild(cdIDCell);
    
    let pricePaidCell = document.createElement("td");
    pricePaidCell.innerHTML = Order.pricePaid;
    newRow.appendChild(pricePaidCell);
    
    let dateCell = document.createElement("td");
    dateCell.innerHTML = Order.date;
    newRow.appendChild(dateCell);
    
    document.getElementById("orderTable").appendChild(newRow);


    fetch ('/SubmitOrder', {
        method: "POST",
        body: JSON.stringify(Order),
        headers: {"Content-type": "application/json; charset=UTF-8"},
    })
        .then(response => response.json()) 
        .then(json => {
            console.log(json);
  
        })  
        .catch(error => console.error(error));
}

function Submit500Orders() {
    let currentTime = new Date();

    for (let i = 0; i < 500; i++) {
        let storePoint = Math.floor(Math.random() * storeIDArray.length);
        let randomstoreID = storeIDArray[storePoint];
    
        let salesPersonPointer =  (Math.floor(Math.random() * 4)) + 1;
        let salesPersonID = (storePoint * 4) + salesPersonPointer;
    
        let cdID = cdIDArray[Math.floor(Math.random() * cdIDArray.length)];
    
        let pricePaid = Math.floor(Math.random() * 15) + 5;
    
        let date = new Date(currentTime.getTime() + (Math.floor(Math.random() * 30000) + 5000));
    
    // A note to myself. This code didn't work because it was inputting empty values from the textbox. THEN it started to catch up then it doesn't again
    //     let Order = new orderObject(
    //         document.getElementById("storeID").value,
    //         document.getElementById("salesPersonID").value,
    //         document.getElementById("cdID").value,
    //         document.getElementById("pricePaid").value,
    //         document.getElementById("date").value
    //     );
        //This code works though
        let Order = new orderObject(
            randomstoreID,
            salesPersonID,
            cdID,
            pricePaid,
            date.toLocaleString()
        );

        fetch ('/SubmitOrder', {
            method: "POST",
            body: JSON.stringify(Order),
            headers: {"Content-type": "application/json; charset=UTF-8"},
        })
            .then(response => response.json()) 
            .then(json => {
                console.log(json);
      
            })  
            .catch(error => console.error(error));
      }




    
    // let date;
    // currentTime = new Date();
    // for (let i = 0; i < 500; i++){
        
    //     if (i == 0){
    //         date = currentTime;
    //     }
    //     else {
    //         date = new Date(currentTime.getTime() + (Math.floor(Math.random() * 30000) + 5000));
    //     }
    //     let Order = new orderObject(
    //         document.getElementById("storeID").value,
    //         document.getElementById("salesPersonID").value,
    //         document.getElementById("cdID").value,
    //         document.getElementById("pricePaid").value,
    //         document.getElementById("date").value
    //     );
        

    //     fetch ('/SubmitOrder', {
    //         method: "POST",
    //         body: JSON.stringify(Order),
    //         headers: {"Content-type": "application/json; charset=UTF-8"},
    //     })
    //         .then(response => response.json()) 
    //         .then(json => {
    //             console.log(json);
      
    //         })  
    //         .catch(error => console.error(error));
    //   }
}



//For 500
    
// let orderArray = [];

// define a constructor to create Order objects
// let MovieObject = function (pTitle, pYear, pGenre, pMan, pWoman, pURL) {
//     this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
//     this.Title = pTitle;
//     this.Year = pYear;
//     this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
// }



// let selectedGenre = "not selected";

// document.addEventListener("DOMContentLoaded", function () {

//     createList();

// add button events ************************************************************************
    
//     document.getElementById("buttonAdd").addEventListener("click", function () {
//         let newMovie = new OrderObject(document.getElementById("title").value, 
//         document.getElementById("year").value, selectedGenre);

//         fetch('/AddMovie', {
//             method: "POST",
//             body: JSON.stringify(newMovie),
//             headers: {"Content-type": "application/json; charset=UTF-8"}
//             })
//             .then(response => response.json()) 
//             .then(json => console.log(json),
//             createList()
//             )
//             .catch(err => console.log(err));
    
//         // $.ajax({
//         //     url : "/AddMovie",
//         //     type: "POST",
//         //     data: JSON.stringify(newMovie),
//         //     contentType: "application/json; charset=utf-8",
//         //      success: function (result) {
//         //         console.log(result);
//         //         createList();
//         //     }
//         // });
       
//     });

//     document.getElementById("buttonGet").addEventListener("click", function () {
//         createList();      
//     });

//     document.getElementById("buttonDelete").addEventListener("click", function () {
//         deleteMovie(document.getElementById("deleteID").value);      
//     });
    
//     document.getElementById("buttonClear").addEventListener("click", function () {
//         document.getElementById("title").value = "";
//         document.getElementById("year").value = "";
//     });

//     $(document).bind("change", "#select-genre", function (event, ui) {
//         selectedGenre = $('#select-genre').val();
//     });

  

// });  
// // end of wait until document has loaded event  *************************************************************************


// function createList() {
// // update local array from server

//     fetch('/getAllMovies')
//     // Handle success
//     .then(response => response.json())  // get the data out of the response object
//     .then( responseData => fillUL(responseData))    //update our array and li's
//     .catch(err => console.log('Request Failed', err)); // Catch errors

//     // $.get("/getAllMovies", function(data, status){  // AJAX get
//     //     movieArray = data;  // put the returned server json data into our local array
        
//     //       // clear prior data
//     //     var divMovieList = document.getElementById("divMovieList");
//     //     while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
//     //         divMovieList.removeChild(divMovieList.firstChild);
//     //     };

//     //     var ul = document.createElement('ul');

//     //     movieArray.forEach(function (element,) {   // use handy array forEach method
//     //         var li = document.createElement('li');
//     //         li.innerHTML = element.ID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
//     //         element.Title + "  &nbsp &nbsp  &nbsp &nbsp "  
//     //         + element.Year + " &nbsp &nbsp  &nbsp &nbsp  " + element.Genre;
//     //         ul.appendChild(li);
//     //     });
//     //     divMovieList.appendChild(ul)

//     // });
// };

// function fillUL(data) {
//         // clear prior data
//     var divMovieList = document.getElementById("divMovieList");
//     while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
//         divMovieList.removeChild(divMovieList.firstChild);
//     };

//     var ul = document.createElement('ul');
//     orderArray = data;
//     orderArray.forEach(function (element,) {   // use handy array forEach method
//         var li = document.createElement('li');
//         li.innerHTML = element.ID + ":  &nbsp &nbsp  &nbsp &nbsp " + 
//         element.Title + "  &nbsp &nbsp  &nbsp &nbsp "  
//         + element.Year + " &nbsp &nbsp  &nbsp &nbsp  " + element.Genre;
//         ul.appendChild(li);
//     });
//     divMovieList.appendChild(ul)
// }

// function deleteMovie(ID) {

//     fetch('/DeleteMovie/' + ID, {
//         method: "DELETE",
//        // body: JSON.stringify(_data),
//         headers: {"Content-type": "application/json; charset=UTF-8"}
//       })
//       .then(response => response.json()) 
//       .then(json => console.log(json))
//       .catch(err => console.log(err));



//     // $.ajax({
//     //     type: "DELETE",
//     //     url: "/DeleteMovie/" +ID,
//     //     success: function(result){
//     //         alert(result);
//     //         createList();
//     //     },
//     //     error: function (xhr, textStatus, errorThrown) {  
//     //         alert("Server could not delete Movie with ID " + ID)
//     //     }  
//     // });
   
// }


  
