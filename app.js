var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// will need array of table heading text used for both tables cart info and barista info

// this will hold a multidimensional array of the coffee cart data by location

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
  //coffeeCartDataByLocation.push(this);
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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// don't like having to list these each by name
// can I put a loop here that runs through each instance name instead? will that also call the functions?
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// ---------------------------------------
// pike place isntance creation
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
// capitol hill isntance creation
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
// seattle public library isntance creation
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
// south lake union isntance creation
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
// basic rendering code below
// ---------------------------------------
// var pikePlace = new CoffeeCarts('Pike Place Market', 14, 35, 1.2, 0.34, 0, 0, 0, 0);
//
// pikePlace.calcCupsPerHour();
// pikePlace.calcCustomersPerHour(); // might not need this hear
// pikePlace.calcBeansPerHour();
// pikePlace.calcBeansNeededForCupsPerHour();
// pikePlace.calcPoundPackagesPerHour();
// pikePlace.calcEmployeesNeededPerHour();
// pikePlace.calcEmployeesNeededPerHour();
// pikePlace.calcDailyCustomersTotal();
// pikePlace.calcDailyCupsTotal();
// pikePlace.calcDailyPoundPackagesTotal();
// pikePlace.calcDailyBeansNeeded();

/*
// this makes a TR tag
var trElement = document.createElement('tr');
// this makes and populates a TD tag
var thElement = document.createElement('td');
thElement.textContext = pikePLace.locationName;
trElement.appendChild(thElement);
// this makes another TD tag
var thElement = document.createElement('td');
thElement.textContext = pikePLace.customersPerHour[0];
trElement.appendChild(thElement);
// this makes another TD tag
var thElement = document.createElement('td');
thElement.textContext = pikePLace.customersPerHour[1];
trElement.appendChild(thElement);
*/

// creating variable to fill test table
var testTable = document.getElementById('test-table');

// -------- below here might be entirely too much
// creating table row
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

/* THIS BLOCK WORKS
var table = document.getElementById('test-table');
var trElement = document.createElement('tr');
// NEW TABLE ROW
// declaring location
var thElement = document.createElement('th');
thElement.textContent = pikePlace.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating first cell
var thElement = document.createElement('td');
thElement.textContent = pikePlace.customersPerHour[0];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating second cell
var thElement = document.createElement('td');
thElement.textContent = pikePlace.customersPerHour[1];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating third cell
var thElement = document.createElement('td');
thElement.textContent = pikePlace.customersPerHour[2];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
*/

/* hold for possible
// NEW TABLE ROW
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = capitolHill.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating first cell
var thElement = document.createElement('td');
thElement.textContent = capitolHill.customersPerHour[0];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating second cell
var thElement = document.createElement('td');
thElement.textContent = capitolHill.customersPerHour[1];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating third cell
var thElement = document.createElement('td');
thElement.textContent = capitolHill.customersPerHour[2];
trElement.appendChild(thElement);
testTable.appendChild(trElement);

// NEW TABLE ROW
var trElement = document.createElement('tr');
// declaring location
var thElement = document.createElement('th');
thElement.textContent = seattlePublicLibrary.locationName;
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating first cell
var thElement = document.createElement('td');
thElement.textContent = seattlePublicLibrary.customersPerHour[0];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating second cell
var thElement = document.createElement('td');
thElement.textContent = seattlePublicLibrary.customersPerHour[1];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating third cell
var thElement = document.createElement('td');
thElement.textContent = seattlePublicLibrary.customersPerHour[2];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
*/

// example code looping through table creation below
/*
for(var j = 0; j < arrayTableContent.length; j++) {
  var trElement = document.createElement('tr');
    for (var i = 0; i < headings.length; i++) {
      var thElement = document.createElement('th');
      thElement.textContent = arrayTableContent[j][i];
      trElement.appendChild(thElement);
    }
  catTable.appendChild(trElement);
}
*/
