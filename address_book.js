

var addressList = [];
var searchValue = "";

//SAVE BUTTON

document.getElementById("save_button").addEventListener("click", function(){

var obj = {
          name:document.getElementById("name").value, //turi html atributa
          phone:document.getElementById("phone").value,
          edit: false,
          favorite: false
          };
/*edit: false, nes is pradziu nera editinamas, reikalingas nuspresti, todel false,
reikia pasitikrinti ar piesti spana ar inputa
veliau nusprendziam kada naudoti value ar text content,
inputas buna kai edit = true*/
  addressList.push(obj)
  displayList();

});

//PRINT ADDRESS LIST

function displayList() {
  document.getElementById("output").innerHTML = null; //value tik tam ka ivedi pats

  //filter name

  var filteredName = addressList.filter(e => e.name.includes(searchValue));
  console.log(filteredName);

  //loop through ann array

  filteredName.forEach(function(address, i) {
    let addressItem = document.createElement("li");
    var name1 = document.createElement(address.edit ? 'input' : 'span'); //neturi html atributo
    var phone1 = document.createElement(address.edit ? 'input' : 'span');//nusprendzia koki elementa kuria
    var favoriteImg = document.createElement(address.favorite ? 'img' : 'undefined');


    //delete button
    var deleteBtn = document.createElement("button"); //gaunasi kaip paselectintas jau
    deleteBtn.addEventListener("click", function() {
            addressList.splice(i, 1);
            console.log('You pushed delete button');
            displayList();

      }
    )

    //edit button
    var editBtn = document.createElement("button");
    editBtn.addEventListener("click", function() {
      if(addressList[i].edit) { //kai priskiri true is spanu pavercia i inputus
        addressList[i].name = name1.value //name1 yra inputas piesti
        addressList[i].phone = phone1.value
      }
      addressList[i].edit = !addressList[i].edit
      displayList();
      }
    )

    //favorite button

    var favoriteBtn = document.createElement("button");
    favoriteBtn.addEventListener("click", function() {
      if(addressList[i].favorite) {
        addressItem.textContent = favoriteImg;
      }
      addressList[i].favorite = !addressList[i].favorite  //kai priskiri true is spanu pavercia i inputus
      displayList();
      }
    )


    name1[address.edit ? 'value' : 'textContent']=address.name;
    phone1[address.edit ? 'value' : 'textContent']= address.phone;
    deleteBtn.textContent = "DELETE";
    editBtn.textContent = address.edit ? 'SAVE' : 'EDIT'; //kai save issaugoti tas reiksmes
    favoriteBtn.textContent = address.favorite ? "REMOVE AS FAVORITE" : "ADD AS FAVORITE";
    favoriteImg.src = "heart.jpg";
    favoriteImg.style.width = "19px";
    favoriteImg.style.heigth = "17px";
    addressItem.appendChild(name1);
    addressItem.appendChild(phone1);
    addressItem.appendChild(deleteBtn);
    addressItem.appendChild(editBtn);
    addressItem.appendChild(favoriteBtn);
    addressItem.appendChild(favoriteImg);
    document.getElementById("output").appendChild(addressItem);
    // Put the object into storage
    localStorage.setItem('addressList', JSON.stringify(addressList));


  });
 //SEARCH BUTTON
  document.getElementById("search").addEventListener("input", function(event){ //nusako ivyki.
//target tai yra objektas kuris laiko info apie ivyki
  searchValue = event.target.value;
  console.log(event.target.value);
  displayList();
})
};
//originaliu duomenu nemodifikuojam su  filter
//add event listener on search input



window.addEventListener("load", function(){
  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('addressList');
  if(retrievedObject){ //patikrinam ar ne null
    addressList = JSON.parse(retrievedObject);
    displayList();
  }


});
