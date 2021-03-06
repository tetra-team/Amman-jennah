var clickedLocation = localStorage.getItem("clicked");

var formSubmit = document.querySelector("form");
var chartContainer = document.getElementById("chartContainer");

var locationsArray = JSON.parse(localStorage.getItem("locations"));
var userMass = document.getElementById("user-mess");

var counter = 0;
var tempArray = [];
var imagesContainer = document.getElementsByClassName("images");
var ctx = document.getElementById("myChart");

var reviewButton = document.getElementById("revire-button");
reviewButton.addEventListener("click", userReview);

function generateImages() {
  for (var i = 0; i < imagesContainer.length; i++) {
    for (var j = 0; j < imagesContainer[i].children.length; j++) {
      var oldImage = imagesContainer[i].children[j].attributes[0];
      var newImage = `${locationsArray[clickedLocation].pathArr[counter]}`;
      oldImage.value = newImage;
      counter++;
    }
  }
}

function generateDescription() {
  var desc = document.getElementById("description");
  var newDesc = locationsArray[clickedLocation].description;
  desc.innerHTML = newDesc;
}

function generateMap() {
  var maps = document.getElementById("Map");
  var newMap = locationsArray[clickedLocation].location;
  maps.innerHTML = newMap;
}

function generateTitle() {
  var locationName = document.getElementById("location-name");
  var title = document.querySelector("title");
  var newName = locationsArray[clickedLocation].name;
  locationName.innerHTML = newName;
  title.innerHTML = newName;
}

function generateBackground() {
  var backGround = document.getElementById("img-background");
  var newBackGround = locationsArray[clickedLocation].mainImg;
  backGround.style.backgroundImage = `url('${newBackGround}')`;
}

function loadLocationArray() {
  for (var i = 0; i < locationsArray.length; i++) {
    locationsArray[i].usersArray =
      JSON.parse(localStorage.getItem(locationsArray[i].name)) || [];
  }
}

function loadArary() {
  tempArray = [];
  locationsArray[clickedLocation].usersArray =
    JSON.parse(localStorage.getItem(locationsArray[clickedLocation].name)) ||
    [];

  tempArray = locationsArray[clickedLocation].usersArray;
  console.log(tempArray);
}

function generate() {
  loadLocationArray();
  generateImages();
  generateDescription();
  generateTitle();
  generateBackground();
  loadArary();
  generateMap();
}

generate();

formSubmit.addEventListener("submit", function () {
  event.preventDefault();
  var name = document.querySelector("input[type='text']");
  var nameValue = name.value;
  var date = document.querySelector("input[type='date']");
  var dateValue = date.value;
  var numberOfVisitors = document.querySelector("input[type='number']");
  var numberValue = numberOfVisitors.value;

  var Info = new FormInfo(nameValue, dateValue, numberValue);
  tempArray.push(Info);
  console.log(tempArray);
  localStorage.setItem(
    locationsArray[clickedLocation].name,
    JSON.stringify(tempArray)
  );
  name.value = "";
  date.value = "";
  numberOfVisitors.value = "";
  userMass.textContent = "Your information has been registered";
  userMass.style.color = "green";
});

function userReview() {
  locationsArray = JSON.parse(localStorage.getItem("locations"));
  var select = document.getElementById("review-values").value;
  var para = document.getElementById("para").value;
  var newReview = new UserRevew(select, para);
  locationsArray[clickedLocation].userRevew.push(newReview);
  localStorage.setItem("locations", JSON.stringify(locationsArray));
  select = "";
  para = "";
  revewData();
}

revewData();

function revewData() {
  var reviewUserData = document.getElementById("review-users");
  reviewUserData.innerHTML = "";
  locationsArray = JSON.parse(localStorage.getItem("locations"));
  var tempArray = locationsArray[clickedLocation].userRevew;
  if (tempArray.length == 0) {
    reviewUserData.style.display = "none";
  } else {
    reviewUserData.style.display = "block";
    var sum = 0;
    for (var i = 1; i <= tempArray.length; i++) {
      sum += parseInt(tempArray[i - 1].review);
      var usersData = `
      <div class="user-review-data">
      <p><i class="fa fa-user-circle" aria-hidden="true"></i> User ${i} </p>
      <p>Review is ${tempArray[i - 1].review} of 5</p>
      <p>${tempArray[i - 1].comment}</p>
      </div>
    `;
      reviewUserData.innerHTML += usersData;
    }
    var avg = sum / tempArray.length;
    var sumAdding = `
      <h3>Rating ${avg.toFixed(2)} of 5 </h3>
    `;
    reviewUserData.innerHTML += sumAdding;
  }
}
