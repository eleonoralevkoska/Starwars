$("#spinner").html('<img class="text-center" src="./assets/spinner3.gif">');
$("#spinner").hide();
let allpeople = [];
let allplanet = [];

$(document).ready(
  $("#getPeople").click(function () {
    $("#spinner").show();
    $(".logo").hide();
    getAllPeople("https://swapi.co/api/people/");
    $("#table").hide();
    // $.ajax({
    //     url: 'https://swapi.co/api/people/',
    //     type: 'GET',

    //     success: function (response) {

    //         $("#spinner").hide()
    //         console.log(response);
    //         insertpeople(response);
    //         $("#table").show()

    //     },
    //     error: function (response) {
    //         console.log(response)

    //     }
    // })
  })
);

function getAllPeople(url) {
  fetch(url)
    .then(response => response.json())
    .then(response => {
      allpeople.push(...response.results);
      return response;
    })
    .then(response => {
      if (response.next) getAllPeople(response.next);
      else {
        insertpeople(allpeople);
        $("#spinner").hide();
      }
    })

    .catch(error => console.log(error));
}
function insertpeople(data) {
  $("#table").show();
  $("tbody").empty();
  $("#people").show();
  $("#planets").hide();
  let counter = 1;
  for (let i = 0; i < data.length; i++) {
    let element = data;
    $("tbody").append(`<tr id="${counter}"><td>${element[i].name}</td>
        <td>${element[i].gender}</td>
        <td>${element[i].birth_year}</td>
        <td>${element[i].height}</td>
        <td>${element[i].mass}</td></tr>
        `);
    counter++;
  }
  $("#table").removeClass("display-none");
  $("#people").removeClass("display-none");
}

$(document).ready(
  $("#getPlanets").click(function () {
    $("#spinner").show();
    $(".logo").hide();
    getAllPlanet("https://swapi.co/api/planets/");
    $("#table").hide();
    // $.ajax({
    //     url: 'https://swapi.co/api/planets/',
    //     type: 'GET',

    //     success: function (responseplanet) {
    //         $("#spinner").hide()

    //         console.log(responseplanet);
    //         insertplanet(responseplanet);
    //         $("#table").show()
    //     },
    //     error: function (responseplanet) {
    //         console.log(responseplanet)

    //     }
    // })
  })
);

function getAllPlanet(url) {
  fetch(url)
    .then(responseplanet => responseplanet.json())
    .then(responseplanet => {
      allplanet.push(...responseplanet.results);
      console.log(allplanet);
      return responseplanet;
    })
    .then(responseplanet => {
      if (responseplanet.next) getAllPlanet(responseplanet.next);
      else {
        insertplanet(allplanet);
        $("#spinner").hide();
      }
    })
    .catch(error => console.log(error));
}

function insertplanet(obj) {
  $("#table").show();
  $("tbody").empty();
  $("#people").hide();
  $("#planets").show();
  for (let i = 0; i < obj.length; i++) {
    let elementPlanet = obj;
    $("tbody").append(`<tr><td>${elementPlanet[i].name}</td>
        <td>${elementPlanet[i].diameter}</td>
        <td>${elementPlanet[i].climate}</td>
        <td>${elementPlanet[i].terrain}</td>
        <td>${elementPlanet[i].rotation_period}</td>
        <td>${elementPlanet[i].population}</td></tr>       
        `);
  }
  $("#table").removeClass("display-none");
  $("#planets").removeClass("display-none");
}

$("#goHome").click(function () {
  $("#table").hide();
  $(".logo").show();
  $("#spinner");
});

$("#search").on("click", () => {
  $("#table").show();
  $("tbody").empty();
  $("#people").show();
  $("#planets").hide();
  let input = $(".form-control").val();
  let foundPeople = [];

  for (const people of allpeople) {
    if (people.name.includes(input)) {
      foundPeople.push(people);
    }
  }
  if (foundPeople.length > 0) {
    for (const person of foundPeople) {
      $("tbody").append(`<tr><td>${person.name}</td>
            <td>${person.gender}</td>
            <td>${person.birth_year}</td>
            <td>${person.height}</td>
            <td>${person.mass}</td></tr>`);
    }
  } else {
    $("#table").hide();
    alert("name not valid");
  }
});
// $("#search").on("click", () => {
//     $("#table").show()
//     $("tbody").empty()
//     $("#people").hide()
//     $("#planets").show()

//     let foundPlanet=[]
// let input = $(".form-control").val();

// if (foundPlanet.length >0){
//   for (const planets of foundPlanet) {

//     $("tbody").append(`<tr><td>${planets.name}</td>
//         <td>${planets.diameter}</td>
//         <td>${planets.climate}</td>
//         <td>${planets.terrain}</td>
//         <td>${planets.rotation_period}</td>
//         <td>${planets.population}</td></tr>
//         `)
//   }        
//     }
//     else{
//         $("#table").hide()
//         alert("planet name not valid")

//     }
// })

$("tbody").on("click", e => {
  let id = e.target.parentElement.id;
  console.log(id);
  let newUrl = "https://swapi.co/api/people/" + id;
  console.log(newUrl);

  getID(newUrl);
});


function getID(newUrl) {
  fetch(newUrl)
    .then(responsenewurl => responsenewurl.json())
    .then(responsenewurl => {

      insertelements(responsenewurl);
    })
    .catch(error => console.log(error));
}

function insertelements(objectelement) {
  $("#list").append(`<ul><li>${objectelement.birth_year}</li>
        <li>${objectelement.created}</li>
        <li>${objectelement.edited}</li>
        <li>${objectelement.eye_color}</li>
        <li>${objectelement.gender}</li>
        <li>${objectelement.hair_color}</li>
        <li>${objectelement.height}</li>
        <li>${objectelement.homeworld}</li>
        <li>${objectelement.mass}</li>
        <li>${objectelement.name}</li>
        </ul>`);
}