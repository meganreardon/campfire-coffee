var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// global varibles to create data tables
var tableName = '';
var whichDailyTotal = '';
var whichHourlyTotal = '';
var companyBeansPerDay = 0;
var beansForHour = 0;
var companyEmployeesPerDay = 0;
var employeesForHour = 0;
var locations = [];
var allBeansPerHour = [];
var allEmployeesPerHour = [];
var beansTable = document.getElementById('beans-table');
var baristasTable = document.getElementById('baristas-table');
var testTable = document.getElementById('test-table');

// ADDED FOR COMBINING FUNCTIONS
var forCurrentHour = 0;
var perDayTotal = 0;
var perHourTotal = 0;

// ---------------------------------------
// constructor function code below
// ---------------------------------------

function CoffeeCarts(locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundBagsBoughtPerCustomer) {
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundBagsBoughtPerCustomer = avgPoundBagsBoughtPerCustomer;
  this.dailyCustomersTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPackagesTotal = 0;
  this.dailyBeansNeeded = 0;
  this.dailyEmployeesNeeded = 0;
  this.customersPerHour = [];
  this.cupsPerHour = [];
  this.beansPerHour = [];
  this.beansNeededForCupsPerHour = [];
  this.poundPackagesPerHour = [];
  this.employeesPerHour = [];
  // this creates our global locations array
  locations.push(this);
};

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

// *****************************************************************************
// ************************************************************** BEANS PER HOUR
// *****************************************************************************
CoffeeCarts.prototype.calcBeansPerHour = function() {
  var addAllBeansPerHour = [];
  for (var i = 0; i < hours.length; i++) {
    var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
    pounds = Math.round( pounds * 10 ) / 10;
    this.beansPerHour.push(pounds);
    addAllBeansPerHour.push(pounds);
  }
  allBeansPerHour.push(addAllBeansPerHour);
};

// *****************************************************************************
// ********************************************************** EMPLOYEES PER HOUR
// *****************************************************************************
CoffeeCarts.prototype.calcEmployeesNeededPerHour = function() {
  var addAllEmployeesPerHour = [];
  for (var i = 0; i < hours.length; i++) {
    var employees = (this.customersPerHour[i] * 2) / 60;
    employees = Math.ceil(employees);
    this.employeesPerHour.push(employees);
    addAllEmployeesPerHour.push(employees);
  }
  allEmployeesPerHour.push(addAllEmployeesPerHour);
};

CoffeeCarts.prototype.calcDailyEmployeesNeeded = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyEmployeesNeeded += this.employeesPerHour[i];
  }
  companyEmployeesPerDay += this.dailyEmployeesNeeded;
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
  parseInt(this.dailyBeansNeeded);
  parseInt(companyBeansPerDay);
  companyBeansPerDay = companyBeansPerDay + this.dailyBeansNeeded;
};

// method to render bean data table
CoffeeCarts.prototype.renderCoffeeDataRows = function() {
  var tableName = beansTable;
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = this.locationName;
  trElement.appendChild(thElement);
  var tdElement = document.createElement('td');
  tdElement.textContent = this.dailyBeansNeeded;
  trElement.appendChild(tdElement);
  for (var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = this.beansPerHour[j];
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
  thElement.textContent = this.locationName;
  trElement.appendChild(thElement);
  var tdElement = document.createElement('td');
  tdElement.textContent = this.dailyEmployeesNeeded;
  trElement.appendChild(tdElement);
  for (var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = this.employeesPerHour[j];
    trElement.appendChild(tdElement);
  }
  tableName.appendChild(trElement);
};

// ---------------------------------------
// instance creation
// ---------------------------------------
var pikePlace = new CoffeeCarts('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHill = new CoffeeCarts('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new CoffeeCarts('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new CoffeeCarts('South Lake Union', 5, 18, 1.3, 0.04);
var seaTac = new CoffeeCarts('Sea-Tac Airport', 28, 44, 1.1, 0.41);

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
// function to render table footer rows
// ---------------------------------------

function calcTableFooter(tableName, perDayTotal, perHourTotal) {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'ALL LOCATIONS';
  trElement.appendChild(thElement);
  var thElement = document.createElement('th');
  console.log('per day total is: ' + perDayTotal);
  thElement.textContent = Math.ceil(perDayTotal);
  trElement.appendChild(thElement);
  // turn into method
  for (var i = 0; i < hours.length; i++) {
    var perHourToal = 0;
    for (var j = 0; j < locations.length; j++) {
      // console.log('locations j is: ' + locations[j].locationName);
      // console.log('per hour total i is: ' + perHourTotal[i]);

      forCurrentHour += locations[j].perHourTotal[i];
      // forCurrentHour += locations[j][perHourTotal][i];
    }
    var thElement = document.createElement('th');
    thElement.textContent = Math.ceil(forCurrentHour);
    trElement.appendChild(thElement);
  }
  // turn into method
  tableName.appendChild(trElement);
};

// calcTableFooter(beansTable, companyBeansPerDay, beansPerHour);

// var forCurrentHour = 0;
// var perDayTotal = 0;
// var perHourTotal = 0;

function calcCoffeeDataFooter(tableName) {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'ALL LOCATIONS';
  trElement.appendChild(thElement);
  var thElement = document.createElement('th');
  thElement.textContent = Math.ceil(companyBeansPerDay);
  trElement.appendChild(thElement);
  for (var i = 0; i < hours.length; i++) {
    var beansForHour = 0;
    for (var j = 0; j < locations.length; j++) {
      beansForHour += locations[j].beansPerHour[i];
    }
    var thElement = document.createElement('th');
    thElement.textContent = Math.ceil(beansForHour);
    trElement.appendChild(thElement);
  }
  tableName.appendChild(trElement);
};

function calcBaristasDataFooter(tableName) {
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = 'ALL LOCATIONS';
  trElement.appendChild(thElement);
  var thElement = document.createElement('th');
  thElement.textContent = Math.ceil(companyEmployeesPerDay);
  trElement.appendChild(thElement);
  for (var i = 0; i < hours.length; i++) {
    var employeesForHour = 0;
    for (var j = 0; j < locations.length; j++) {
      employeesForHour += locations[j].employeesPerHour[i];
    }
    var thElement = document.createElement('th');
    thElement.textContent = Math.ceil(employeesForHour);
    trElement.appendChild(thElement);
  }
  tableName.appendChild(trElement);
};

// -----------------------------------------------------------------------------
// COFFEE AND BARISTA DATA TABLE RENDER
// -----------------------------------------------------------------------------

coffeeDataHeader(beansTable);
callBeanData();
// calcTableFooter(beansTable, companyBeansPerDay, beansForHour);
calcCoffeeDataFooter(beansTable);

coffeeDataHeader(baristasTable);
callBaristasData();
// calcTableFooter(baristasTable, companyEmployeesPerDay, employeesPerHour);
calcBaristasDataFooter(baristasTable);

// -----------------------------------------------------------------------------
// FORM INFORMATION BELOW
// -----------------------------------------------------------------------------

// setting up variables
var handleNewCartSubmit = document.getElementById('add-new-location-form');

handleNewCartSubmit.addEventListener('submit', function(event){

  event.preventDefault();

  var addNewLocation = event.target.newlocation.value;
  var addNewMin = parseFloat(event.target.newmin.value);
  var addNewMax = parseFloat(event.target.newmax.value);
  var addNewCups = parseFloat(event.target.newcups.value);
  var addNewPounds = parseFloat(event.target.newpounds.value);

  if (!event.target.newlocation.value || !event.target.newmin.value || !event.target.newmax.value || !event.target.newcups.value || !event.target.newpounds.value) {
    return alert('All fields need to be filled in. Thanks!');
  }

  var newCoffeeCart = new CoffeeCarts(addNewLocation, addNewMin, addNewMax, addNewCups, addNewPounds);
  callCalcMethods(newCoffeeCart);

  beansTable.innerHTML = '';
  baristasTable.innerHTML = '';

  // rewrite body and footers of tables
  coffeeDataHeader(beansTable);
  callBeanData();
  // calcTableFooter(beansTable, companyBeansPerDay, beansPerHour);
  calcCoffeeDataFooter(beansTable);

  coffeeDataHeader(baristasTable);
  callBaristasData();
  // calcTableFooter(baristasTable, companyEmployeesPerDay, employeesPerHour);
  calcBaristasDataFooter(baristasTable);

  // reset form
  event.target.newlocation.value = null;
  event.target.newmin.value = null;
  event.target.newmax.value = null;
  event.target.newcups.value = null;
  event.target.newpounds.value = null;
});
