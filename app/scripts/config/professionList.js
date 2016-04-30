angular.module('IDshare')

  .factory('professionList', function() {
    var list;
    list = [
      {value:"Youtuber"},{value:"Developer"},{value:"Doctor"},{value:"Engineer"},{value:"Officer"},{value:"Consultant"},{
      value:"Teacher"},{value:"Designer"},{value:"Footballer"},{value:"Cricketer"},{value:"Businessman"},{value:"Contractor"},{value:"Worker"},
      {value:"Singer"},{value:"Dancer"},{value:"Nurse"},{value:"Barber"},{value:"Architect"},{value:"Analyst"},
      {value:"Broker"},{value:"Nanny"},{value:"Maid"},{value:"Plumber"},{value:"Mechanic"},{value:"Electrician"},
      {value:"Farmer"},{value:"Fire Fighter"},{value:"Politician"},{value:"Guide"},{value:"Writer"},{value:"Actor"},
      {value:"Event Organiser"},{value:"Director"},{value:"Producer"},{value:"HouseKeeper"},{value:"Watchman"},{value:"Investor"},{value:"Librarian"},
      {value:"Student"}];
    return list;
  });
