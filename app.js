var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

var locations = [];
// get with locations[i].locationName
// will be iteration indicator word, not locationName string

// will need array of table heading text used for both tables cart info and barista info

// ---------------------------------------
// constructor funcion code below
// ---------------------------------------

// constructor and variables to pass
function CoffeeCarts(locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundBagsBoughtPerCustomer, dailyCustomersTotal, dailyCupsTotal, dailyPoundPackagesTotal, dailyBeansNeeded, dailyEmployeesNeeded) {
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundBagsBoughtPerCustomer = avgPoundBagsBoughtPerCustomer;
  this.dailyCustomersTotal = dailyCustomersTotal;
  this.dailyCupsTotal = dailyCupsTotal;
  this.dailyPoundPackagesTotal = dailyPoundPackagesTotal;
  this.dailyBeansNeeded = dailyBeansNeeded;
  this.dailyEmployeesNeeded = dailyEmployeesNeeded; //added this variable correspond w/ new function below
  this.customersPerHour = [];
  this.cupsPerHour = [];
  this.beansPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.poundPackagesPerHour = [];
  this.employeesPerHour = [];
  locations.push(this);
};

// my code for methods for our object
CoffeeCarts.prototype.calcCustomersPerHour = function(min, max) {
  for (var i = 0; i < hours.length; i ++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.customersPerHour.push(customers);

  }
};

CoffeeCarts.prototype.calcCupsPerHour = function() {
  this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour); // spencer added this to call up there
  for (var i = 0; i < hours.length; i++) {
    var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
    cups = Math.round( cups * 10 ) / 10;
    this.cupsPerHour.push(cups);
  }
};

CoffeeCarts.prototype.calcBeansNeededForCupsPerHour = function() {
  //this.calcCupsPerHour(); // spencer added this to call up there
  for (var i = 0; i < hours.length; i++) {
    var beans = this.cupsPerHour[i] / 16;
    beans = Math.round( beans * 10 ) / 10;
    this.beansNeededForCupsPerHour.push(beans);
  }
};

CoffeeCarts.prototype.calcPoundPackagesPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var bags = this.customersPerHour[i] * this.avgPoundBagsBoughtPerCustomer;
    bags = Math.round( bags );
    this.poundPackagesPerHour.push(bags);
  }
};

CoffeeCarts.prototype.calcBeansPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
    pounds = Math.round( pounds * 10 ) / 10;
    this.beansPerHour.push(pounds);
  }
};

CoffeeCarts.prototype.calcEmployeesNeededPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var employees = (this.customersPerHour[i] * 2) / 60;
    employees = Math.ceil(employees);
    this.employeesPerHour.push(employees);
  }
};

// new function added to varible dailyEmployeesNeeded
CoffeeCarts.prototype.calcDailyEmployeesNeeded = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyEmployeesNeeded += this.employeesPerHour[i];
  }
};

CoffeeCarts.prototype.calcDailyCustomersTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyCustomersTotal += this.customersPerHour[i];
  }
};

CoffeeCarts.prototype.calcDailyCupsTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyCupsTotal += this.cupsPerHour[i];
    this.dailyCupsTotal = Math.round( this.dailyCupsTotal * 10 ) / 10;
  }
};

CoffeeCarts.prototype.calcDailyPoundPackagesTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
    this.dailyPoundPackagesTotal = Math.round( this.dailyPoundPackagesTotal);
  }
};

CoffeeCarts.prototype.calcDailyBeansNeeded = function() {
  this.dailyBeansNeeded = (this.dailyCupsTotal / 16) + this.dailyPoundPackagesTotal;
  this.dailyBeansNeeded = Math.round( this.dailyBeansNeeded * 10 ) / 10;
};
// added this function to fill table data for beans per hour
CoffeeCarts.prototype.dataBeansNeededPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('td');
    // oooh dear, this is going to be totally wrong
    tdElement.textContent = beansPerHour[i];
    console.log(beansPerHour[i]);
    trElement.appendChild(tdElement);
    tableHeader.appendChild(trElement);
  }
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// don't like having to list these each by name
// I will put a loop here that runs through each instance name instead
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ---------------------------------------
// pike place instance creation
// ---------------------------------------
var pikePlace = new CoffeeCarts('Pike Place Market', 14, 35, 1.2, 0.34, 0, 0, 0, 0, 0);

pikePlace.calcCupsPerHour();
pikePlace.calcCustomersPerHour(); // might not need this hear, is called inside cups per hour above
pikePlace.calcBeansPerHour();
pikePlace.calcBeansNeededForCupsPerHour();
pikePlace.calcPoundPackagesPerHour();
pikePlace.calcEmployeesNeededPerHour();
pikePlace.calcDailyCustomersTotal();
pikePlace.calcDailyCupsTotal();
pikePlace.calcDailyPoundPackagesTotal();
pikePlace.calcDailyBeansNeeded();
pikePlace.calcDailyEmployeesNeeded();

// ---------------------------------------
// capitol hill instance creation
// ---------------------------------------
var capitolHill = new CoffeeCarts('Capitol Hill', 12, 28, 3.2, 0.03, 0, 0, 0, 0, 0);

capitolHill.calcCupsPerHour();
capitolHill.calcCustomersPerHour(); // might not need this hear
capitolHill.calcBeansPerHour();
capitolHill.calcBeansNeededForCupsPerHour();
capitolHill.calcPoundPackagesPerHour();
capitolHill.calcEmployeesNeededPerHour();
capitolHill.calcEmployeesNeededPerHour();
capitolHill.calcDailyCustomersTotal();
capitolHill.calcDailyCupsTotal();
capitolHill.calcDailyPoundPackagesTotal();
capitolHill.calcDailyBeansNeeded();
capitolHill.calcDailyEmployeesNeeded();

// ---------------------------------------
// seattle public library instance creation
// ---------------------------------------
var seattlePublicLibrary = new CoffeeCarts('Seattle Public Library', 9, 45, 2.6, 0.02, 0, 0, 0, 0, 0);

seattlePublicLibrary.calcCupsPerHour();
seattlePublicLibrary.calcCustomersPerHour(); // might not need this hear
seattlePublicLibrary.calcBeansPerHour();
seattlePublicLibrary.calcBeansNeededForCupsPerHour();
seattlePublicLibrary.calcPoundPackagesPerHour();
seattlePublicLibrary.calcEmployeesNeededPerHour();
seattlePublicLibrary.calcEmployeesNeededPerHour();
seattlePublicLibrary.calcDailyCustomersTotal();
seattlePublicLibrary.calcDailyCupsTotal();
seattlePublicLibrary.calcDailyPoundPackagesTotal();
seattlePublicLibrary.calcDailyBeansNeeded();
seattlePublicLibrary.calcDailyEmployeesNeeded();

// ---------------------------------------
// south lake union instance creation
// ---------------------------------------
var southLakeUnion = new CoffeeCarts('South Lake Union', 5, 18, 1.3, 0.04, 0, 0, 0, 0, 0);

southLakeUnion.calcCupsPerHour();
southLakeUnion.calcCustomersPerHour(); // might not need this hear
southLakeUnion.calcBeansPerHour();
southLakeUnion.calcBeansNeededForCupsPerHour();
southLakeUnion.calcPoundPackagesPerHour();
southLakeUnion.calcEmployeesNeededPerHour();
southLakeUnion.calcEmployeesNeededPerHour();
southLakeUnion.calcDailyCustomersTotal();
southLakeUnion.calcDailyCupsTotal();
southLakeUnion.calcDailyPoundPackagesTotal();
southLakeUnion.calcDailyBeansNeeded();
southLakeUnion.calcDailyEmployeesNeeded();

// ---------------------------------------
// sea-tac airport instance creation
// ---------------------------------------
var seaTac = new CoffeeCarts('Sea-Tac Airport', 28, 44, 1.1, 0.41, 0, 0, 0, 0, 0);

seaTac.calcCupsPerHour();
seaTac.calcCustomersPerHour(); // might not need this hear
seaTac.calcBeansPerHour();
seaTac.calcBeansNeededForCupsPerHour();
seaTac.calcPoundPackagesPerHour();
seaTac.calcEmployeesNeededPerHour();
seaTac.calcEmployeesNeededPerHour();
seaTac.calcDailyCustomersTotal();
seaTac.calcDailyCupsTotal();
seaTac.calcDailyPoundPackagesTotal();
seaTac.calcDailyBeansNeeded();
seaTac.calcDailyEmployeesNeeded();

// ---------------------------------------
// start of temporary table code
// ---------------------------------------
// ---------------------------------------
// temp code for beans data table
// ---------------------------------------
// creating variable to fill test table
var testTable = document.getElementById('beans-table');

// ---------------------------------------
// function to render table header row
// ---------------------------------------
function coffeeDataHeader() {
  // create the table
  var tableHeader = document.getElementById('beans-table');
  // create the tr
  var trElement = document.createElement('tr');
  //create the first th - populate with nothing
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  // create the second th - populate with Daily Total
  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Total';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  //console.log('reached end of static code');
  // loop through the hours of the day, all th cells
  for (var i = 0; i < hours.length; i++) {
    //console.log('got inside the loop');
    var thElement = document.createElement('th');
    //console.log(hours[i]);
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
    tableHeader.appendChild(trElement);
  }
  // fin
};

// call the coffee data header to render the top row of one of our tables
coffeeDataHeader();

// ---------------------------------------
// hardcoded beans needed table data
// ---------------------------------------
//var table = document.getElementById('beans-table');

// NEW TABLE ROW PIKE PLACE
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = pikePlace.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.dailyCustomersTotal;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for PIKE PLACE
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = pikePlace.customersPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW CAPITOL HILL
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = capitolHill.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = capitolHill.dailyCustomersTotal;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for CAPITOL HILL
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = capitolHill.customersPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW PUBLIC LIBRARY
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = seattlePublicLibrary.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = seattlePublicLibrary.dailyCustomersTotal;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for SEATTLE PUBLIC LIBRARY
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = seattlePublicLibrary.customersPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW SOUTH LAKE UNION
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = southLakeUnion.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = southLakeUnion.dailyCustomersTotal;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for SOUTH LAKE UNION
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = southLakeUnion.customersPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW SEATAC
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = seaTac.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = seaTac.dailyCustomersTotal;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for SEA-TAC AIRPORT
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = seaTac.customersPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// ---------------------------------------
// hardcoded beans footer table row
// ---------------------------------------
 // var table = document.getElementById('beans-table');

function coffeeDataFooter() {
// create the table
  var tableHeader = document.getElementById('beans-table');
  // create the tr
  var trElement = document.createElement('tr');
  //create the first th
  var thElement = document.createElement('th');
  thElement.textContent = 'TOTALS';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  // create the second th - populate with Daily Total
  var thElement = document.createElement('th');
  thElement.textContent = 'PH';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  for (var i = 0; i < hours.length; i++) {
    //console.log('got inside the loop');
    var thElement = document.createElement('th');
    //console.log(hours[i]);
    thElement.textContent = 'ph';
    trElement.appendChild(thElement);
    tableHeader.appendChild(trElement);
  }
// fin
};
coffeeDataFooter();

// ---------------------------------------
// BARISTAS TABLE
// ---------------------------------------
// ---------------------------------------
// function to render table header row for baristas needed
// ---------------------------------------
var testTable = document.getElementById('baristas-table');
function coffeeDataHeader() {
  // create the table
  var tableHeader = document.getElementById('baristas-table');
  // create the tr
  var trElement = document.createElement('tr');
  //create the first th - populate with nothing
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  // create the second th - populate with Daily Total
  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Total';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  //console.log('reached end of static code');
  // loop through the hours of the day, all th cells
  for (var i = 0; i < hours.length; i++) {
    //console.log('got inside the loop');
    var thElement = document.createElement('th');
    //console.log(hours[i]);
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
    tableHeader.appendChild(trElement);
  }
  // fin
};

// NEW TABLE ROW PIKE PLACE
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = pikePlace.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.dailyEmployeesNeeded;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for PIKE PLACE
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = pikePlace.employeesPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW CAPITOL HILL
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = capitolHill.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = capitolHill.dailyEmployeesNeeded;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for CAPITOL HILL
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = capitolHill.employeesPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW PUBLIC LIBRARY
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = seattlePublicLibrary.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = seattlePublicLibrary.dailyEmployeesNeeded;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for SEATTLE PUBLIC LIBRARY
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = seattlePublicLibrary.employeesPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW SOUTH LAKE UNION
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = southLakeUnion.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = southLakeUnion.dailyEmployeesNeeded;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for SOUTH LAKE UNION
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = southLakeUnion.employeesPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

// NEW TABLE ROW SEATAC
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = seaTac.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = seaTac.dailyEmployeesNeeded;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// for loop for SEA-TAC AIRPORT
for (i = 0; i < hours.length; i++) {
  var tdElement = document.createElement('td');
  tdElement.textContent = seaTac.employeesPerHour[i];
  trElement.appendChild(tdElement);
  testTable.appendChild(trElement);
};

function coffeeDataFooter() {
// create the table
  var tableHeader = document.getElementById('beans-table');
  // create the tr
  var trElement = document.createElement('tr');
  //create the first th
  var thElement = document.createElement('th');
  thElement.textContent = 'TOTALS';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  // create the second th - populate with Daily Total
  var thElement = document.createElement('th');
  thElement.textContent = 'PH';
  trElement.appendChild(thElement);
  tableHeader.appendChild(trElement);
  for (var i = 0; i < hours.length; i++) {
    //console.log('got inside the loop');
    var thElement = document.createElement('th');
    //console.log(hours[i]);
    thElement.textContent = 'ph';
    trElement.appendChild(thElement);
    tableHeader.appendChild(trElement);
  }
// fin
};
coffeeDataFooter();

// call the coffee data header to render the top row of one of our tables
//coffeeDataHeader();

/*
 hardcoded footer data
// NEW FOOTER ROW TOTAL
var trElement = document.createElement('tr');
// first cell
var thElement = document.createElement('th');
thElement.textContent = 'TOTALS';
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// daily total info PIKE PLACE
var thElement = document.createElement('th');
thElement.textContent = pikePlace.dailyBeansNeeded;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// daily total info CAPITOL HILL
var thElement = document.createElement('th');
thElement.textContent = capitolHill.dailyBeansNeeded;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// daily total info LIBRARY
var thElement = document.createElement('th');
thElement.textContent = seattlePublicLibrary.dailyBeansNeeded;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// daily total info SOUTH LAKE UNION
var thElement = document.createElement('th');
thElement.textContent = southLakeUnion.dailyBeansNeeded;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// daily total info SEA=TAC
var thElement = document.createElement('th');
thElement.textContent = seaTac.dailyBeansNeeded;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
*/

// ---------------------------------------
// EVERYTHING BELOW IS SAVED FOR FUTURE FIXING UP OF THIS HERE PAGE
// ---------------------------------------
/*
TEMPORARY, START OF GOOD HARDCODED DATA

// ---------------------------------------
// hardcoded beans needed w/ working data
// ---------------------------------------

// populating first cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.customersPerHour[0];
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// populating second cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.customersPerHour[1];
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// populating third cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.customersPerHour[2];
trElement.appendChild(tdElement);
testTable.appendChild(trElement);

var testTable = document.getElementById('test-table-employees');

// ---------------------------------------
// hardcoded employee table w/ working data
// ---------------------------------------
var table = document.getElementById('test-table');
var trElement = document.createElement('tr');
// NEW TABLE ROW
// declaring location
var thElement = document.createElement('th');
thElement.textContent = pikePlace.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.dailyCustomersTotal;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// -------- below here might be entirely too much
// creating table row
var table = document.getElementById('test-table-employees');
var trElement = document.createElement('tr');
// NEW TABLE ROW
// declaring location
var thElement = document.createElement('th');
thElement.textContent = pikePlace.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// wedging in a totals cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.dailyEmployeesNeeded;
trElement.appendChild(tdElement);
testTable.appendChild(trElement);
// populating first cell
var tdElement = document.createElement('td');
tdElement.textContent = pikePlace.employeesPerHour[0];
trElement.appendChild(tdElement);
testTable.appendChild(trElement);

TEMPORARY, END OF GOOD HARDCODED DATA
*/

// ---------------------------------------
// function to render table data row - unfinished
// ---------------------------------------
/* commenting out in block to hold for later work
function coffeeDataMiddle() {
var tableHeader = document.getElementById('test-table-header'); // do I need this here?
// create the tr
var trElement = document.createElement('tr');
//create the first th - populate with name of location
// print the name of the location
var thElement = document.createElement('th');
thElement.textContent = '';
trElement.appendChild(thElement);
tableHeader.appendChild(trElement);
// print the total beans needed for that location
// loop through the total beans by hours
// do this by calling method dataBeansNeededPerHour
// loop through each location using the locations[] array
// loopy
// no need to close the table
}
*/
// loop to create FOOTER rows // notes in paper notebook // this will be a FUNCTION with a loop in it
