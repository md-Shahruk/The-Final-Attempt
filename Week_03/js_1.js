
function introduce(city, country){
  console.log(this.name + " is form " + city + ", " + country);
  
}
const user = {name: "Shahruk"};

introduce.call(user, "Dhaka", "Bangladesh.");
