const INFO_ACTORS_URL = "https://data.cinetica-tech.com/test/api/actors";


var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(INFO_ACTORS_URL).then(function (infoActors) {
    if (infoActors.status === "ok") {
      var info = infoActors.data;

      for(let actors of info ){

        let table = document.getElementById("table");

        let index = info.indexOf(actors); //show index
        

        table.innerHTML += `
          <tr>
            <th>` + index + `</th>
            <td>`+ actors.id + `</td>
            <td>
              <img src="` + actors.picture + `" alt="Responsive image" class="img-fluid" style="width:50px; height:70px">
            </td>
            <td id="name">` + actors.name + `</td>
            <td>`+ actorGender() + `</td>
            <td>`+ age() + `</td>
            <td>
              <button type="button" id="edit" class="btn btn-primary">Edit</button>
            </td>
          </tr>`


        //edit button
        document.getElementById("edit").addEventListener("click", () =>{
          const name = document.getElementById("name");
          name.innerHTML += `<input type="text" id="newName" value="">
          <input type="button" id="save" value="Save" class="btn btn-primary">`
        })


        //function show age
        function age() {
          const today = new Date();
          const born = new Date(actors.bornDate);
          const age = today.getFullYear() - born.getFullYear();

          return age

        }

        //function converts gender in Actor or Actress
        function actorGender(){
          const gender = actors.gender;
          if(gender === "M"){
            return "Actor"
          }else{
            return "Actress"
          }

        }


        
      }
      
      
    }
  

  });


});