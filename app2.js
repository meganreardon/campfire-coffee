var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  //avgPoundsPerCustomer: 0.34,
  beansPerCup: 0.34,
  beansPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
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
  // here we are filling the cups per hour array
  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      //console.log(this.avgCupsPerCustomer);
      var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      //console.log(cups);
      //cups = Math.ceil(cups);
      cups = Math.round( cups * 10 ) / 10; //make this an outside function?
      //console.log(cups);
      this.cupsPerHour.push(cups);
      console.log(cups);
    }
  },
  calcBeansNeededForCupsPerHour: function() {
    // something goes here
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] * this.beansPerCup;
      beans = Math.round( beans * 10 ) / 10;
      this.beansNeededForCupsPerHour.push(beans);
    }
  },
  // this renders to the html page
  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour();
    pikePlace.calcBeansNeededForCupsPerHour();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      // this is the line you want to add new functions to
      liElement.textContent = 'Customers per hour: ' + this.customersPerHour[i] + ', Cups per hour: ' + this.cupsPerHour[i] + ', total beans that went into cups: ' + this.beansNeededForCupsPerHour[i] + '.';
      ulElement.appendChild(liElement);
    }
  }//end of function renderCustomersPerHour
}; //end of object

pikePlace.render();
