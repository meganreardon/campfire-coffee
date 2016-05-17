var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// ---------------------------------------
// Pike Place
// ---------------------------------------
var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundBagsBoughtPerCustomer: 0.34,
  beansPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  employeesPerHour: [], // I added this variable
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      cups = Math.round( cups * 10 ) / 10;
      this.cupsPerHour.push(cups);
    }
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      beans = Math.round( beans * 10 ) / 10;
      this.beansNeededForCupsPerHour.push(beans);
    }
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var bags = this.customersPerHour[i] * this.avgPoundBagsBoughtPerCustomer;
      bags = Math.round( bags );
      this.poundPackagesPerHour.push(bags);
    }
  },
  calcBeansPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      pounds = Math.round( pounds * 10 ) / 10;
      this.beansPerHour.push(pounds);
    }
  },
  calcEmployeesNeededPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      //
      var employees = (this.customersPerHour[i] * 2) / 60;
      employees = Math.ceil(employees);
      this.employeesPerHour.push(employees);
    }
  },
  calcDailyCustomersTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },
  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
      this.dailyCupsTotal = Math.round( this.dailyCupsTotal * 10 ) / 10;
    }
  },
  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
      this.dailyPoundPackagesTotal = Math.round( this.dailyPoundPackagesTotal);
    }
  },
  calcDailyBeansNeeded: function() {
    this.dailyBeansNeeded = (this.dailyCupsTotal / 16) + this.dailyPoundPackagesTotal;
    this.dailyBeansNeeded = Math.round( this.dailyBeansNeeded * 10 ) / 10;
  },
  render: function() {
    // hourly total calculation functions
    this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
    this.calcCupsPerHour();
    this.calcBeansNeededForCupsPerHour();
    this.calcPoundPackagesPerHour();
    this.calcBeansPerHour();
    // daily total calculation functions
    this.calcDailyCustomersTotal();
    this.calcDailyCupsTotal();
    this.calcDailyPoundPackagesTotal();
    this.calcDailyBeansNeeded();
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      // string of hourly totals
      liElement.textContent = hours[i] + ': ' + this.beansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' cutomers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // daily totals
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(liElement);
  }//end of function render
};

pikePlace.render();
pikePlace.calcEmployeesNeededPerHour(); //do I need to print this anywhere in the html output for today?

// ---------------------------------------
// Capitol Hill
// ---------------------------------------
var capitolHill = {
  locationName: 'Capitol Hill',
  minCustomersHour: 12,
  maxCustomersHour: 28,
  avgCupsPerCustomer: 3.2,
  avgPoundBagsBoughtPerCustomer: 0.03,
  beansPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  employeesPerHour: [], // I added this variable
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      cups = Math.round( cups * 10 ) / 10;
      this.cupsPerHour.push(cups);
    }
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      beans = Math.round( beans * 10 ) / 10;
      this.beansNeededForCupsPerHour.push(beans);
    }
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var bags = this.customersPerHour[i] * this.avgPoundBagsBoughtPerCustomer;
      bags = Math.round( bags );
      this.poundPackagesPerHour.push(bags);
    }
  },
  calcBeansPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      pounds = Math.round( pounds * 10 ) / 10;
      this.beansPerHour.push(pounds);
    }
  },
  calcEmployeesNeededPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      //
      var employees = (this.customersPerHour[i] * 2) / 60;
      employees = Math.ceil(employees);
      this.employeesPerHour.push(employees);
    }
  },
  calcDailyCustomersTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },
  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
      this.dailyCupsTotal = Math.round( this.dailyCupsTotal * 10 ) / 10;
    }
  },
  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
      this.dailyPoundPackagesTotal = Math.round( this.dailyPoundPackagesTotal);
    }
  },
  calcDailyBeansNeeded: function() {
    this.dailyBeansNeeded = (this.dailyCupsTotal / 16) + this.dailyPoundPackagesTotal;
    this.dailyBeansNeeded = Math.round( this.dailyBeansNeeded * 10 ) / 10;
  },
  render: function() {
    // hourly total calculation functions
    this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
    this.calcCupsPerHour();
    this.calcBeansNeededForCupsPerHour();
    this.calcPoundPackagesPerHour();
    this.calcBeansPerHour();
    // daily total calculation functions
    this.calcDailyCustomersTotal();
    this.calcDailyCupsTotal();
    this.calcDailyPoundPackagesTotal();
    this.calcDailyBeansNeeded();
    var ulElement = document.getElementById('capitol');
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      // string of hourly totals
      liElement.textContent = hours[i] + ': ' + this.beansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' cutomers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // daily totals
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(liElement);
  }//end of function render
};

capitolHill.render();
capitolHill.calcEmployeesNeededPerHour(); // do I need to print this anywhere in the html output for today?

// ---------------------------------------
// Seattle Public Library
// ---------------------------------------
var seattlePublicLibrary = {
  locationName: 'Seattle Public Library',
  minCustomersHour: 9,
  maxCustomersHour: 45,
  avgCupsPerCustomer: 2.6,
  avgPoundBagsBoughtPerCustomer: 0.02,
  beansPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  employeesPerHour: [], // I added this variable
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      cups = Math.round( cups * 10 ) / 10;
      this.cupsPerHour.push(cups);
    }
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      beans = Math.round( beans * 10 ) / 10;
      this.beansNeededForCupsPerHour.push(beans);
    }
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var bags = this.customersPerHour[i] * this.avgPoundBagsBoughtPerCustomer;
      bags = Math.round( bags );
      this.poundPackagesPerHour.push(bags);
    }
  },
  calcBeansPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      pounds = Math.round( pounds * 10 ) / 10;
      this.beansPerHour.push(pounds);
    }
  },
  calcEmployeesNeededPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      //
      var employees = (this.customersPerHour[i] * 2) / 60;
      employees = Math.ceil(employees);
      this.employeesPerHour.push(employees);
    }
  },
  calcDailyCustomersTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },
  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
      this.dailyCupsTotal = Math.round( this.dailyCupsTotal * 10 ) / 10;
    }
  },
  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
      this.dailyPoundPackagesTotal = Math.round( this.dailyPoundPackagesTotal);
    }
  },
  calcDailyBeansNeeded: function() {
    this.dailyBeansNeeded = (this.dailyCupsTotal / 16) + this.dailyPoundPackagesTotal;
    this.dailyBeansNeeded = Math.round( this.dailyBeansNeeded * 10 ) / 10;
  },
  render: function() {
    // hourly total calculation functions
    this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
    this.calcCupsPerHour();
    this.calcBeansNeededForCupsPerHour();
    this.calcPoundPackagesPerHour();
    this.calcBeansPerHour();
    // daily total calculation functions
    this.calcDailyCustomersTotal();
    this.calcDailyCupsTotal();
    this.calcDailyPoundPackagesTotal();
    this.calcDailyBeansNeeded();
    var ulElement = document.getElementById('spl');
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      // string of hourly totals
      liElement.textContent = hours[i] + ': ' + this.beansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' cutomers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // daily totals
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(liElement);
  }// end of function render
};

seattlePublicLibrary.render();
seattlePublicLibrary.calcEmployeesNeededPerHour(); //do I need to print this anywhere in the html output for today?

// ---------------------------------------
// South Lake Union
// ---------------------------------------
var southLakeUnion = {
  locationName: 'South Lake Union',
  minCustomersHour: 5,
  maxCustomersHour: 18,
  avgCupsPerCustomer: 1.3,
  avgPoundBagsBoughtPerCustomer: 0.04,
  beansPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  employeesPerHour: [], // I added this variable
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      cups = Math.round( cups * 10 ) / 10;
      this.cupsPerHour.push(cups);
    }
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      beans = Math.round( beans * 10 ) / 10;
      this.beansNeededForCupsPerHour.push(beans);
    }
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var bags = this.customersPerHour[i] * this.avgPoundBagsBoughtPerCustomer;
      bags = Math.round( bags );
      this.poundPackagesPerHour.push(bags);
    }
  },
  calcBeansPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      pounds = Math.round( pounds * 10 ) / 10;
      this.beansPerHour.push(pounds);
    }
  },
  calcEmployeesNeededPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      //
      var employees = (this.customersPerHour[i] * 2) / 60;
      employees = Math.ceil(employees);
      this.employeesPerHour.push(employees);
    }
  },
  calcDailyCustomersTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },
  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
      this.dailyCupsTotal = Math.round( this.dailyCupsTotal * 10 ) / 10;
    }
  },
  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
      this.dailyPoundPackagesTotal = Math.round( this.dailyPoundPackagesTotal);
    }
  },
  calcDailyBeansNeeded: function() {
    this.dailyBeansNeeded = (this.dailyCupsTotal / 16) + this.dailyPoundPackagesTotal;
    this.dailyBeansNeeded = Math.round( this.dailyBeansNeeded * 10 ) / 10;
  },
  render: function() {
    // hourly total calculation functions
    this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
    this.calcCupsPerHour();
    this.calcBeansNeededForCupsPerHour();
    this.calcPoundPackagesPerHour();
    this.calcBeansPerHour();
    // daily total calculation functions
    this.calcDailyCustomersTotal();
    this.calcDailyCupsTotal();
    this.calcDailyPoundPackagesTotal();
    this.calcDailyBeansNeeded();
    var ulElement = document.getElementById('slu');
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      // string of hourly totals
      liElement.textContent = hours[i] + ': ' + this.beansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' cutomers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // daily totals
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(liElement);
  }// end of function render
};

southLakeUnion.render();
southLakeUnion.calcEmployeesNeededPerHour(); //do I need to print this anywhere in the html output for today?

// ---------------------------------------
// Sea-Tac Airport
// ---------------------------------------
var seaTac = {
  locationName: 'Sea-Tac Airport',
  minCustomersHour: 28,
  maxCustomersHour: 44,
  avgCupsPerCustomer: 1.1,
  avgPoundBagsBoughtPerCustomer: 0.41,
  beansPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  employeesPerHour: [], // I added this variable
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      cups = Math.round( cups * 10 ) / 10;
      this.cupsPerHour.push(cups);
    }
  },
  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      beans = Math.round( beans * 10 ) / 10;
      this.beansNeededForCupsPerHour.push(beans);
    }
  },
  calcPoundPackagesPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var bags = this.customersPerHour[i] * this.avgPoundBagsBoughtPerCustomer;
      bags = Math.round( bags );
      this.poundPackagesPerHour.push(bags);
    }
  },
  calcBeansPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      pounds = Math.round( pounds * 10 ) / 10;
      this.beansPerHour.push(pounds);
    }
  },
  calcEmployeesNeededPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      //
      var employees = (this.customersPerHour[i] * 2) / 60;
      employees = Math.ceil(employees);
      this.employeesPerHour.push(employees);
    }
  },
  calcDailyCustomersTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },
  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
      this.dailyCupsTotal = Math.round( this.dailyCupsTotal * 10 ) / 10;
    }
  },
  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
      this.dailyPoundPackagesTotal = Math.round( this.dailyPoundPackagesTotal);
    }
  },
  calcDailyBeansNeeded: function() {
    this.dailyBeansNeeded = (this.dailyCupsTotal / 16) + this.dailyPoundPackagesTotal;
    this.dailyBeansNeeded = Math.round( this.dailyBeansNeeded * 10 ) / 10;
  },
  render: function() {
    // hourly total calculation functions
    this.calcCustomersPerHour(this.minCustomersHour, this.maxCustomersHour);
    this.calcCupsPerHour();
    this.calcBeansNeededForCupsPerHour();
    this.calcPoundPackagesPerHour();
    this.calcBeansPerHour();
    // daily total calculation functions
    this.calcDailyCustomersTotal();
    this.calcDailyCupsTotal();
    this.calcDailyPoundPackagesTotal();
    this.calcDailyBeansNeeded();
    var ulElement = document.getElementById('seatac');
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      // string of hourly totals
      liElement.textContent = hours[i] + ': ' + this.beansPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' cutomers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    // daily totals
    var liElement = document.createElement('li');
    liElement.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(liElement);
  }// end of function render
};

seaTac.render();
seaTac.calcEmployeesNeededPerHour(); //do I need to print this anywhere in the html output for today?
