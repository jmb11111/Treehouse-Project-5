//creates empty variables to allow for global manipulation

let currentEmployeeZ;
let currentEmployee;
let employees = [];
//creates the employee objects
class Employee {
  constructor(name, location, email, picture, login, cell, dob, selected) {
    this.name = name;
    this.location = location;
    this.email = email;
    this.picture = picture;
    this.login = login;
    this.cell = cell;
    this.dob = dob;
    this.selected = false;
  }
  //builds each card for individuals
  buildCard() {
    let card = `
     <li>
     <div class="card">
     <div class="pic">
     <img src=${this.picture.large} alt="Avatar">
     </div> 
     <div class="container">
     <h4><b>${this.name.first} ${this.name.last}</b></h4>
     <p>${this.email}</p>
     </div>
     </div>
     </li>
     `;
    return card;
  }

  //builds extended cards that are hidden by default
  buildModal() {
    console.log(this.dob);
    let modal = `
      <div class="card-expanded">
      <img src="../xbox-x.png" id="close" onclick="hideModal()">
      <div class="pic-expanded">
      <img src=${this.picture.large} alt="Avatar">
      </div> <div class="container-expanded">
      <h4><b>${this.name.first} ${this.name.last}</b></h4>
      <p>${this.email}</p>
      <br>
      <br>
      <br>
      <div class="lowerInfo">
      <p>${this.login.username}</p>
      <p>${this.cell}</p>
      <p>Birthday:${this.dob.date.toString().slice(0, 10)}</p>
      </div>
      <img src='../leftArrow.png' class="arrows" onclick="displayPrevModal()" alt="LeftArrow">
      <img src='../rightArrow.png' class="arrows" onclick="displayNextModal()" alt="RightArrow">
      </div>
      `;
    return modal;
  }
}
//gets user data from API
const getUsersData = () => {
  return fetch(
    "https://randomuser.me/api/?results=12&inc=name,location,email,picture,login,cell,dob&nat=US"
  )
    .then(response => response.json())
    .then(data => {
      return data.results;
    });
};
//gets current search value
let searchInput = $("#search").val();

$("#searchButton").click(function(event) {
  searchInput = $("#search").val();
  console.log(searchInput);
  displayModalOnSearch(searchInput);
});

//populates the page with the data supplied from the API
const displayEmployees = () => {
  getUsersData().then(results => {
    employees = results;
    employees.forEach(element => {
      const employee = new Employee(
        element.name,
        element.location,
        element.email,
        element.picture,
        element.login,
        element.cell,
        element.dob
      );
      const card = employee.buildCard();
      $(".directory").append(card);
    });
    //adds ability to click on each card to display more info (modal)
    $("li").click(function(event) {
      console.log(
        $(this)
          .find("p")
          .text()
      );
      displayModalOnClick(
        $(this)
          .find("p")
          .text()
      );
    });
  });
};
//adds ability to click on each card to display more info (modal) continued functions
const displayModalOnClick = selectedEmail => {
  $(".modal").show();
  currentEmployee = employees.filter(emp => emp.email === selectedEmail);
  currentEmployee.forEach(element => {
    currentEmployeeZ = new Employee(
      element.name,
      element.location,
      element.email,
      element.picture,
      element.login,
      element.cell,
      element.dob,
      element.selected
    );
    const modal = currentEmployeeZ.buildModal();
    currentEmployeeZ.selected = true;
    $(".modal").append(modal);
  });
};

//adds search function to display first modal matching search criteria
const displayModalOnSearch = searchInput => {
  currentEmployee = employees.filter(
    emp =>
      emp.name.first.toString().includes(searchInput) ||
      emp.name.last.toString().includes(searchInput) ||
      emp.login.username.toString().includes(searchInput)
  );
  if (currentEmployee.toString() !== "") {
    $(".modal").show();
    currentEmployee.forEach(element => {
      currentEmployeeZ = new Employee(
        element.name,
        element.location,
        element.email,
        element.picture,
        element.login,
        element.cell,
        element.dob,
        element.selected
      );
      const modal = currentEmployeeZ.buildModal();
      console.log(employees.indexOf(currentEmployee[0]));
      $(".modal").append(modal);
    });
  } else {
    alert("No one by that name or username!");
  }
};

//adds next button in modal to display next card info
const displayNextModal = () => {
  $(".modal").empty();

  let index = employees.indexOf(currentEmployee[0]);
  currentEmployee = [employees[index + 1]];
  console.log(currentEmployee);
  if (index + 1 < employees.length) {
    currentEmployee.forEach(element => {
      nextEmployeeZ = new Employee(
        element.name,
        element.location,
        element.email,
        element.picture,
        element.login,
        element.cell,
        element.dob,
        element.selected
      );
      const modal = nextEmployeeZ.buildModal();
      // console.log(employees.indexOf(currentEmployee[0]));

      $(".modal").append(modal);
    });
  } else {
    //goes to first array if next is hit on last array item
    currentEmployee = [employees[0]];
    currentEmployee.forEach(element => {
      nextEmployeeZ = new Employee(
        element.name,
        element.location,
        element.email,
        element.picture,
        element.login,
        element.cell,
        element.dob,
        element.selected
      );
      const modal = nextEmployeeZ.buildModal();
      // console.log(employees.indexOf(currentEmployee[0]));

      $(".modal").append(modal);
    });
  }
};
//adds previous button functionality to display previous card
const displayPrevModal = () => {
  $(".modal").empty();

  let index = employees.indexOf(currentEmployee[0]);

  console.log(currentEmployee);
  if (index - 1 >= 0) {
    currentEmployee = [employees[index - 1]];
    currentEmployee.forEach(element => {
      nextEmployeeZ = new Employee(
        element.name,
        element.location,
        element.email,
        element.picture,
        element.login,
        element.cell,
        element.dob,
        element.selected
      );
      const modal = nextEmployeeZ.buildModal();
      // console.log(employees.indexOf(currentEmployee[0]));

      $(".modal").append(modal);
    });
  } else {
    //goes to end of array if prev is hit on first card
    currentEmployee = [employees[employees.length - 1]];
    currentEmployee.forEach(element => {
      nextEmployeeZ = new Employee(
        element.name,
        element.location,
        element.email,
        element.picture,
        element.login,
        element.cell,
        element.dob,
        element.selected
      );
      const modal = nextEmployeeZ.buildModal();
      // console.log(employees.indexOf(currentEmployee[0]));

      $(".modal").append(modal);
    });
  }
};

//closes and empties modals
function hideModal() {
  $(".modal").hide();
  $(".modal").empty();
}
//populates page
displayEmployees();
