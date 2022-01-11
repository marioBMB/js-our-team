const team = [
  {
    name: 'Wayne Barnett',
    role: 'Founder & CEO',
    image: 'img/wayne-barnett-founder-ceo.jpg',
  },
  {
    name: 'Angela Caroll',
    role: 'Chief Editor',
    image: 'img/angela-caroll-chief-editor.jpg',
  },
  {
    name: 'Walter Gordon',
    role: 'Office Manager',
    image: 'img/walter-gordon-office-manager.jpg',
  },
  {
    name: 'Angela Lopez',
    role: 'Social Media Manager',
    image: 'img/angela-lopez-social-media-manager.jpg',
  },
  {
    name: 'Scott Estrada',
    role: 'Developer',
    image: 'img/scott-estrada-developer.jpg',
  },
  {
    name: 'Barbara Ramos',
    role: 'Graphic Designer',
    image: 'img/barbara-ramos-graphic-designer.jpg',
  },
];



const teamCard = document.getElementsByClassName("team-card")[0];
const teamSection = document.getElementsByClassName("team-container")[0];

const teamCardTemplate = `<div class="card-image">
                            <img src="" alt=""/>
                          </div>
                          <div class="card-text">
                            <h3></h3>
                            <p></p>
                          </div>`;


const submitBtn = document.getElementById("addMemberButton");
const errorMessages = [];

drawTeam();


function drawTeam(){

    // let html = "";

    for (let i = 0; i < team.length;  i++ ){

        addMember(team[i]);
      // html += newCard.innerHTML;
      // teamSection.innerHTML = html;
    }
}


function addMember(userObj){

    let newCard = document.createElement("DIV");
    newCard.className = "team-card";
    newCard.innerHTML = teamCardTemplate;

    let imgBox = newCard.getElementsByClassName('card-image')[0];
    imgBox.innerHTML = "<img src='" + userObj.image +  "'>";

    let title = newCard.querySelector('.card-text h3');
    title.innerHTML = userObj.name;
    
    let subtitle = newCard.querySelector('.card-text p');
    subtitle.innerHTML = userObj.role;

    teamSection.append(newCard);
}




submitBtn.addEventListener("click", function(e){

    let inputs = document.getElementsByTagName("input");
    
    const newMember = {
      'name' : "",
      'role' : "",
      'image' : ""
    };

    for (let i = 0; i < inputs.length; i++){

        let value = inputs[i].value.trim();
        console.log(value);
        id = inputs[i].getAttribute('id');


        if (value != ""){
          
            newMember[id] = value;

            if (id == "image" && !imageExists(value)){
              errorMessages.push("L'indirizzo inserito per l'immagine non è reperibile <br>"); 
            }
        }
        else {
            errorMessages.push("Il campo '"+ id + "' non può essere vuoto <br>");
        }
    }

    console.log(newMember);
    
    if (errorMessages.length == 0){
       addMember(newMember);
    }
    else {
        let formBox = document.getElementsByClassName("form-container")[0];
        let addMember = document.querySelector("#add-member .container");

        let msgBox = document.createElement("DIV");
        msgBox.className = "errors-box";
        msgBox.innerHTML = errorMessages;
        addMember.insertBefore(msgBox, formBox);
    }

});


function imageExists(image_url){

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status != 404;
}