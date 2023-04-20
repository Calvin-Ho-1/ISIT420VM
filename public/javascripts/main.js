const storeIDArray = [98053 , 98007, 98077, 98055, 98011, 98046];
const cdIDArray = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];

let orderObject = function (pStoreID, pSalesPersonID, pCdID, pPricepaid, pDate) {
    this.StoreID = pStoreID  
    this.SalesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.PricePaid = parseInt(pPricepaid);  
    this.Date = pDate;
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

    document.getElementById("sortSalesNumPerCD").addEventListener("click", function(){
        getSalesPerCd();
        console.log("Sales Per Cd")
        
    });

    document.getElementById("sortOrdersByStore").addEventListener("click", function(){
        ordersTotalByStore();
        console.log("Sales Per Cd")
        
    });

    // document.getElementById("selectMostRecentBtn").addEventListener("click", function(){
    //     getMostRecent();
        
    // })
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
    console.log(Order);
    let newRow = document.createElement("tr");

    let storeIDCell = document.createElement("td");
    storeIDCell.innerHTML = Order.StoreID;
    newRow.appendChild(storeIDCell);
    
    let salesPersonIDCell = document.createElement("td");
    salesPersonIDCell.innerHTML = Order.SalesPersonID;
    newRow.appendChild(salesPersonIDCell);
    
    let cdIDCell = document.createElement("td");
    cdIDCell.innerHTML = Order.CdID;
    newRow.appendChild(cdIDCell);
    
    let pricePaidCell = document.createElement("td");
    pricePaidCell.innerHTML = Order.PricePaid;
    newRow.appendChild(pricePaidCell);
    
    let dateCell = document.createElement("td");
    dateCell.innerHTML = Order.Date;
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

        let Order = new orderObject(
            randomstoreID,
            salesPersonID,
            cdID,
            pricePaid,
            date
        );
        console.log(Order);
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
}



function getSalesPerCd() {
        // let getList = document.getElementById("list");
        // getList.innerHTML = json[0]._id;
    fetch('/getSalesPerCd')
    // Handle success
    .then(response => response.json())  // get the data out of the response object
    .then(json => {
        document.getElementById("sortTable").innerHTML = "";
        const sortTable = document.createElement("table");
        const headerRow = document.createElement("tr");
  
        const cdIDHeader = document.createElement("th");
        cdIDHeader.innerHTML = "CD ID";
        headerRow.appendChild(cdIDHeader);
  
        const pricePaidHeader = document.createElement("th");
        pricePaidHeader.innerHTML = "Price Paid";
        headerRow.appendChild(pricePaidHeader);

        sortTable.appendChild(headerRow);
        document.getElementById("sortTable").appendChild(sortTable);

        json.forEach(Order => {
            let newRow = document.createElement("tr");

            
            let cdIDCell = document.createElement("td");
            cdIDCell.innerHTML = Order._id;
            newRow.appendChild(cdIDCell);
            
            let pricePaidCell = document.createElement("td");
            pricePaidCell.innerHTML = Order.totalPrice;
            newRow.appendChild(pricePaidCell);


            sortTable.appendChild(newRow);

        });
  
        //document.body.appendChild(sortTable);
      })
    .then(json => console.log(json))
    .catch(err => console.log('Request Failed', err));
    // })
    
    
    // document.getElementById("orderTable").appendChild(newRow);
 // Catch errors
    console.log("Here");
};

// let cdIDCell = document.createElement("td");
// cdIDCell.innerHTML = Order.CdID;
// newRow.appendChild(cdIDCell);

// let pricePaidCell = document.createElement("td");
// pricePaidCell.innerHTML = Order.pricePaid;
// newRow.appendChild(pricePaidCell);
// document.getElementById("orderTable").appendChild(newRow);

    // let newRow = document.createElement("tr");

    
    // let cdIDCell = document.createElement("td");
    // cdIDCell.innerHTML = Order.CdID;
    // newRow.appendChild(cdIDCell);
    
    // let pricePaidCell = document.createElement("td");
    // pricePaidCell.innerHTML = Order.pricePaid;
    // newRow.appendChild(pricePaidCell);

    
    // document.getElementById("orderTable").appendChild(newRow);


function ordersTotalByStore() {

    fetch('/orderTotalsByStore')
    // Handle success
    .then(response => response.json())  // get the data out of the response object
    .then(json => {
        document.getElementById("sortTable").innerHTML = "";
        const sortTable = document.createElement("table");
        const headerRow = document.createElement("tr");
  
        const storeIDHeader = document.createElement("th");
        storeIDHeader.innerHTML = "Store ID";
        headerRow.appendChild(storeIDHeader);
  
        const pricePaidHeader = document.createElement("th");
        pricePaidHeader.innerHTML = "Price Paid";
        headerRow.appendChild(pricePaidHeader);

        sortTable.appendChild(headerRow);
        document.getElementById("sortTable").appendChild(sortTable);

        json.forEach(Order => {
            let newRow = document.createElement("tr");

            
            let storeIDCell = document.createElement("td");
            storeIDCell.innerHTML = Order._id;
            newRow.appendChild(storeIDCell);
            
            let pricePaidCell = document.createElement("td");
            pricePaidCell.innerHTML = Order.totalSalesQuantity;
            newRow.appendChild(pricePaidCell);

            sortTable.appendChild(newRow);

        });
  
        //document.body.appendChild(sortTable);
      })
    //.then(json => console.log(json))
    .catch(err => console.log('Request Failed', err)); // Catch errors
    
    // let newRow = document.createElement("tr");

    // let storeIDCell = document.createElement("td");
    // storeIDCell.innerHTML = Order.storeID;
    // newRow.appendChild(storeIDCell);
    
    
    // let pricePaidCell = document.createElement("td");
    // pricePaidCell.innerHTML = Order.pricePaid;
    // newRow.appendChild(pricePaidCell);
    
    // document.getElementById("orderTable").appendChild(newRow);
};


