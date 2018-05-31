

class Employee {
  constructor (name, location, email, picture, login, cell, dob, selected) {
      this.name = name;
      this.location = location;
      this.email = email;
      this.picture = picture;
      this.login = login;
      this.cell = cell;
      this.dob = dob;
      this.selected = false;
  }
   buildCard(){
     let card =`
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
     `
    return card;}
    buildModal(){
      let modal=
      `
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
      <p>${this.dob}</p>
      </div>
      </div>
      `
      return modal;
    }
    
    }

const getUsersData = () => {
  return fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture,login,cell,dob&nat=US')
.then(response => response.json())
.then(data => {return data.results});
}
let employees= [];
const displayEmployees = () => {
  getUsersData()
      .then(results => {
           employees = results;
           employees.forEach(element => {
            const employee = new Employee(element.name, element.location, element.email, element.picture, element.login, element.cell, element.dob);
            const card = employee.buildCard();
            $(".directory").append(card);
           });
          $("li").click(function(event){
           console.log( $(this).find("p").text());
            displayModal($(this).find("p").text());
          });
        });
        
      }

const displayModal = (selectedEmail) => {
          $(".modal").show();
          const currentEmployee = employees.filter(emp => emp.email === selectedEmail)
          console.log(currentEmployee.name);
           currentEmployee.forEach(element => {
            const currentEmployee = new Employee(element.name, element.location, element.email, element.picture, element.login, element.cell, element.dob);
            const modal = currentEmployee.buildModal();
            $(".modal").append(modal);
           });
          
        }

// const displayNextModal = () => {
  
//   console.log(currentEmployee.name);
//     currentEmployee.forEach(element => {
//     const currentEmployee = new Employee(element.name, element.location, element.email, element.picture, element.login, element.cell, element.dob);
//     const modal = currentEmployee.buildModal();
//     $(".modal").append(modal);
//     });
  
// }

function hideModal() {
  $(".modal").hide();
  $(".modal").empty();
}

displayEmployees();