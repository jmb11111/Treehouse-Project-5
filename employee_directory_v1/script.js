$(".card").click(function(){
    $(".modal").show();
})

$("#close").click(function(){
    $(".modal").hide();
})

// let data1;

// $.ajax({
//     url: 'https://randomuser.me/api/?results=12',
//     dataType: 'json',
//     success: (data)=>{
//       data1 = data;
//       buildCard1();
//     }
//   });
        

// console.log(data1["0"].picture.large);


fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => buildCard1(data))

  function buildCard1(data){
       let card1HTML= '<div class="pic">';
        card1HTML+= `<img src=${data.results["0"].picture.large} alt="Avatar">`;
        card1HTML+= '</div> <div class="container">';
        card1HTML+= `<h4><b>${data.results["0"].name.first} ${data.results["0"].name.last}</b></h4>`;
        card1HTML+= `<p>${data.results["0"].email}</p></div>`;
        
        $("#card1").html(card1HTML);

      }