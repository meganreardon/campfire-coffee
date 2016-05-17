var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// will need array of table heading text used for both tables cart info and barista info

// this will hold a multidimensional array of the coffee cart data by location

// ---------------------------------------
// constructor funcion code below
// ---------------------------------------

// constructor and variables to pass
function CoffeeCarts(locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundBagsBoughtPerCustomer, dailyCustomersTotal, dailyCupsTotal, dailyPoundPackagesTotal, dailyBeansNeeded) {
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundBagsBoughtPerCustomer = avgPoundBagsBoughtPerCustomer;
  this.dailyCustomersTotal = dailyCustomersTotal;
  this.dailyCupsTotal = dailyCupsTotal;
  this.dailyPoundPackagesTotal = dailyPoundPackagesTotal;
  this.dailyBeansNeeded = dailyBeansNeeded;
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
    //
    var employees = (this.customersPerHour[i] * 2) / 60;
    employees = Math.ceil(employees);
    this.employeesPerHour.push(employees);
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

// ---------------------------------------
// making the instances below
// ---------------------------------------

var pikePlace = new CoffeeCarts('Pike Place Market', 14, 35, 1.2, 0.34, 0, 0, 0, 0);

// don't like having to list these each by name
// can I put a loop here that runs through each instance name instead? will that also call the functions?
pikePlace.calcCupsPerHour();
pikePlace.calcCustomersPerHour(); // might not need this hear, is called inside cups per hour above
pikePlace.calcBeansPerHour();
pikePlace.calcBeansNeededForCupsPerHour();
pikePlace.calcPoundPackagesPerHour();
pikePlace.calcEmployeesNeededPerHour();

// ---------------------------------------
// basic rendering code below
// ---------------------------------------

// creating variable to fill test table
var testTable = document.getElementById('test-table');

// creating table row
var trElement = document.createElement('tr');
// populating first cell
var thElement = document.createElement('th');
thElement.textContent = pikePlace.customersPerHour[0];
trElement.appendChild(thElement);
testTable.appendChild(trElement);
// populating second cell
var thElement = document.createElement('th');
thElement.textContent = pikePlace.customersPerHour[1];
trElement.appendChild(thElement);
testTable.appendChild(trElement);

// example code below
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
