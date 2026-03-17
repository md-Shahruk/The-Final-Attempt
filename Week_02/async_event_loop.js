
// console.log("start");

// setTimeout(() => {
//   console.log("timeout 1");
//   Promise.resolve().then(() => console.log("micro inside timeout"));
// }, 0);

// Promise.resolve()
//   .then(() => {
//     console.log("micro 1");
//     setTimeout(() => console.log("timeout 2"), 0);
//   })
//   .then(() => console.log("micro 2"));

// console.log("end");
// // start,end,  micr 1, micro2, time1, micro inside,  time 2 

console.log("Project 2 — Fake User Login");
const fakeUserLogin = new Promise((resolve, reject)=>{
      const username = "Shahruk";
      const password = "123";

      if (username === "Shahruk" && password === "123"){
        resolve("Login successfully.");
      }else{
        reject("Login failed.");
      }
});

// fakeUserLogin.then(success =>{
//   console.log(success);
  
// })
// .catch(error =>{
//   console.log(error);
  
// });

console.log("Project 3 — Fetch User Profile");
const fetchUserProfile = new Promise((resolve,reject)=>{
  const user = { name: "Shahruk", age: 25 };
  resolve(user);

});

// fetchUserProfile.then((user)=>{
//   console.log(user);
//   return user.name;
  
// })
// .catch(error =>{
//   console.log(error);
  
// })

console.log("Project 4 — File Download Simulator");
const filedownload = new Promise((resolve, reject)=>{
  setTimeout(()=> resolve("File downloaded successfully"), 2000
  );
});

// filedownload.then(success=>{
//   console.log(success);
  
// })
// .catch(error=>{
//   console.log(error);
  
// }) 

console.log("Project 5 — Payment System");
const paymetSystem = new Promise((resolve, reject)=>{
   const data = {balance: 100, price:60}
   if(data.balance >= data.price){
    resolve(data);
   }else{
    reject("Not enough balance.");
   }
});

paymetSystem.then(data =>{
  console.log("Payment successful.");
  return data.balance - data.price;
  
})
.then(bal =>{
  console.log(bal);
  
})
.catch(error =>{
  console.log(error);
  
})

