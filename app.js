var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// varibles to create data tables
var tableName = '';
var whichDailyTotal = '';
var whichHourlyTotal = '';
var beansTable = document.getElementById('beans-table');
var baristasTable = document.getElementById('baristas-table');
// new for footer
var companyBeansPerDay = 0;

var locations = [];
// get with locations[i].locationName
// will be iteration indicator word, not locationName string

// ---------------------------------------
// constructor function code below
// ---------------------------------------

// constructor and variables to pass
function CoffeeCarts(locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundBagsBoughtPerCustomer) {
  // known values below
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundBagsBoughtPerCustomer = avgPoundBagsBoughtPerCustomer;
  // unknown values below
  this.dailyCustomersTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPackagesTotal = 0;
  this.dailyBeansNeeded = 0;
  this.dailyEmployeesNeeded = 0;
  // arrays!
  this.customersPerHour = [];
  this.cupsPerHour = [];
  this.beansPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.poundPackagesPerHour = [];
  this.employeesPerHour = [];
  // this creates our global locations array
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
    this.dailyPoundPackagesTotal += bags;
  }
};

CoffeeCarts.prototype.calcBeansPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
    // console.log('pounds is at: ' + pounds);
    // console.log (this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i]);
    pounds = Math.round( pounds * 10 ) / 10;
    this.beansPerHour.push(pounds);
    // companyBeansPerDay += pounds;
    // this is Dan example code
    // why is pounds a string here??
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
  console.log('daily beans needed is: ' + this.dailyBeansNeeded);
  console.log('daily beans needed is: ' + typeof this.dailyBeansNeeded);
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // COMPANY TOTAL BEANS CALCULTAIONS HERE ALSO RETURN STRING
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  parseInt(this.dailyBeansNeeded);
  parseInt(companyBeansPerDay);
  companyBeansPerDay = companyBeansPerDay + this.dailyBeansNeeded;
  console.log('company beans needed total is at: ' + companyBeansPerDay); // THIS RETURNS A STRING
  console.log('...........');
};

// method to render bean data table
CoffeeCarts.prototype.renderCoffeeDataRows = function() {
  var tableName = beansTable;
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = this.locationName ;
  trElement.appendChild(thElement);
  var tdElement = document.createElement('td');
  tdElement.innerHTML = '<td>' + this.dailyBeansNeeded + '</td>';
  trElement.appendChild(tdElement);
  for (var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.innerHTML = '<td>' + this.beansPerHour[j] + '</td>';
    trElement.appendChild(tdElement);
  }
  tableName.appendChild(trElement);
};

// method to render baristas data table
CoffeeCarts.prototype.renderBaristasDataRows = function() {
  var tableName = baristasTable;
  var trElement = document.createElement('tr');
  trElement.innerHTML = '<tr>';
  var thElement = document.createElement('th');
  thElement.innerHTML = '<th>' + this.locationName + '</th>';
  trElement.appendChild(thElement);
  var tdElement = document.createElement('td');
  tdElement.innerHTML = '<td>' + this.dailyEmployeesNeeded + '</td>';
  trElement.appendChild(tdElement);
  for (var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.innerHTML = '<td>' + this.employeesPerHour[j] + '</td>';
    trElement.appendChild(tdElement);
  }
  tableName.appendChild(trElement);
};

/*
// ----------------
// render for the form
// ----------------
// this is example from class // delete later
Comment.prototype.render = function() {
  var liEl = document.createElement('li');
  liEl.innerHTML = '<img width="100px" src="img/' + this.userName + '.jpg"> <b>' + this.userName + ': </b><em>' + this.text + '</em>';
  return liEl;
};
*/

// ---------------------------------------
// instance creation
// ---------------------------------------
var pikePlace = new CoffeeCarts('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHill = new CoffeeCarts('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new CoffeeCarts('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new CoffeeCarts('South Lake Union', 5, 18, 1.3, 0.04);
var seaTac = new CoffeeCarts('Sea-Tac Airport', 28, 44, 1.1, 0.41);

//loop to call methods
function callCalcMethods(location) {
  location.calcCupsPerHour();
  location.calcBeansNeededForCupsPerHour();
  location.calcPoundPackagesPerHour();
  location.calcEmployeesNeededPerHour();
  location.calcDailyCustomersTotal();
  location.calcDailyCupsTotal();
  location.calcDailyPoundPackagesTotal();
  location.calcDailyBeansNeeded();
  location.calcDailyEmployeesNeeded();
  location.calcBeansPerHour();
};

callCalcMethods(pikePlace);
callCalcMethods(capitolHill);
callCalcMethods(seattlePublicLibrary);
callCalcMethods(southLakeUnion);
callCalcMethods(seaTac);

function callBeanData() {
  for (var i = 0; i < locations.length; i++) {
    locations[i].renderCoffeeDataRows();
  }
};

function callBaristasData() {
  for (var i = 0; i < locations.length; i++) {
    locations[i].renderBaristasDataRows();
  }
};

// ---------------------------------------
// function to render table header row
// ---------------------------------------
function coffeeDataHeader(tableName) {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);
  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Total';
  trElement.appendChild(thElement);
  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  tableName.appendChild(trElement);
};

// ---------------------------------------
// function to render table footer row
// ---------------------------------------

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// THIS IS MY NEW FOOTER ROW
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function calcCoffeeDataFooter(tableName) {
  // first cell 'TOTALS'
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'TOTALS';
  trElement.appendChild(thElement);
  // second cell company wide beans per day
  var thElement = document.createElement('th');
  thElement.textContent = companyBeansPerDay;
  // thElement.textContent = 'placeholder';
  // console.log('company beans per day is: ' + companyBeansPerDay);
  trElement.appendChild(thElement);
  // loops
  for (var i = 0; i < hours.length; i++) {
    // declare empty variables
    var beansForHour = 0;
    for (var j = 0; j < locations.length; j++) {
      // added to check
      var numeral = locations[j].beansPerHour[i];
      //console.log(numeral);
      // console.log(i++);
      // console.log(locations[j]);
      // console.log(beansPerHour[i]);
      // close added to check
      // put me back in beansForHour += locations[j].beansPerHour[i];
      var thElement = document.createElement('th');
      thElement.textContent = beansForHour;
      trElement.appendChild(thElement);
    }
    //beansForHour.push(sum-name-tbd);
  }
  tableName.appendChild(trElement);
  // loop
  // third cell addition of hourly totals for 6am location[i].hours[j]
  // fourth cell addition of hourly totals for 7am location[i].hours[j]
  // push this to an array
};

function coffeeDataFooter(tableName) {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'TOTALS';
  trElement.appendChild(thElement);
  var thElement = document.createElement('th');
  thElement.textContent = 'PH';
  trElement.appendChild(thElement);
  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = 'ph';
    trElement.appendChild(thElement);
  }
  tableName.appendChild(trElement);
};

// // sam's example code
// var destinationArray = [];
// var a = [3, 7, 6, 5];
// var b = [9, 4, 2, 6];
// var c = [5, 1, 8, 7];
// var all = [a, b, c];
//
// for (var i = 0; i < a.length; i++) {
//   var sum = 0;
//   for (var j = 0; j < all.length; j++) {
//     sum += all[j][i];
//   }
//   destinationArray.push(sum);
// }

// -----------------------------------------------------------------------------
// COFFEE AND BARISTA DATA TABLE RENDER
// -----------------------------------------------------------------------------

coffeeDataHeader(beansTable);
callBeanData();
coffeeDataFooter(beansTable);

coffeeDataHeader(baristasTable);
callBaristasData();
coffeeDataFooter(baristasTable);

// -----------------------------------------------------------------------------
// FORM INFORMATION BELOW
// -----------------------------------------------------------------------------

// setting up variables
var handleNewCartSubmit = document.getElementById('add-new-location-form'); // this is the form itself

// handle submission - my own, unfinished
handleNewCartSubmit.addEventListener('submit', function(event){

  event.preventDefault();

  var addNewLocation = event.target.newlocation.value;
  // need to parse int the numbers as they go in
  var addNewMin = parseFloat(event.target.newmin.value);
  var addNewMax = parseFloat(event.target.newmax.value);
  var addNewCups = parseFloat(event.target.newcups.value);
  var addNewPounds = parseFloat(event.target.newpounds.value);

  if (!event.target.newlocation.value || !event.target.newmin.value || !event.target.newmax.value || !event.target.newcups.value || !event.target.newpounds.value) {
    return alert('All fields need to be filled in. Thanks!');
  }

  var newCoffeeCart = new CoffeeCarts(addNewLocation, addNewMin, addNewMax, addNewCups, addNewPounds);
  callCalcMethods(newCoffeeCart);

  // loop through body and footer of Beans table and set
  // chatList.innerHTML = '';
  beansTable.innerHTML = '';
  baristasTable.innerHTML = '';
  // for (var i = 0; i < locations.length; i++) {
  //   console.log('about to delete ' + i);
  //   locations[i].innerHTML = '';
  // };

  // rewrite body and footers of tables
  coffeeDataHeader(beansTable);
  callBeanData();
  coffeeDataFooter(beansTable);

  coffeeDataHeader(baristasTable);
  callBaristasData();
  coffeeDataFooter(baristasTable);

  // reset form
  event.target.newlocation.value = null;
  event.target.newmin.value = null;
  event.target.newmax.value = null;
  event.target.newcups.value = null;
  event.target.newpounds.value = null;
});
