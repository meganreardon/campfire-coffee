var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

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
      bags = Math.round( bags * 10 ) / 10;
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
      this.dailyPoundPackagesTotal = Math.round( this.dailyPoundPackagesTotal * 10 ) / 10;
    }
  },
  calcDailyBeansNeeded: function() {
    this.dailyBeansNeeded = (this.dailyCupsTotal / 16) + this.dailyPoundPackagesTotal;
    this.dailyBeansNeeded = Math.round( this.dailyBeansNeeded * 10 ) / 10;
  },
  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour();
    pikePlace.calcBeansNeededForCupsPerHour();
    pikePlace.calcPoundPackagesPerHour();
    pikePlace.calcBeansPerHour();
    // daily total calc functions here
    pikePlace.calcDailyCustomersTotal();
    pikePlace.calcDailyCupsTotal();
    pikePlace.calcDailyPoundPackagesTotal();
    pikePlace.calcDailyBeansNeeded();
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      // this is the line you want to add new functions to
      liElement.textContent = 'Customers per hour: ' + this.customersPerHour[i] + ', Cups per hour: ' + this.cupsPerHour[i] + ', total beans that went into cups: ' + this.beansNeededForCupsPerHour[i] + ', pound bags sold per hour ' + this.poundPackagesPerHour[i] + ', pound of beans sold per hour ' + this.beansPerHour[i] + '.';
      ulElement.appendChild(liElement);
    }

    // trial adding bullet point for total daily customers,
    var liElement = document.createElement('li');
    liElement.textContent = 'Total daily customers: ' + this.dailyCustomersTotal + '.';
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total daily cups: ' + this.dailyCupsTotal + '.';
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total daily pound packages: ' + this.dailyPoundPackagesTotal + '.';
    ulElement.appendChild(liElement);
    var liElement = document.createElement('li');
    liElement.textContent = 'Total pounds of beans needed at location: ' + this.dailyBeansNeeded + '.';
    ulElement.appendChild(liElement);

    //12 lines to add the 4 last bullet points
    //create / give conetnt / appendChild

  }//end of function render
}; //end of object

pikePlace.render();
pikePlace.calcEmployeesNeededPerHour(); //do I need to print this anywhere in the html output for today?
