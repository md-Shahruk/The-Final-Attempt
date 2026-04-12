import { MyPromises } from "./myPromise.js";
const userName = document.getElementById('username') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const logInbutton = document.getElementById('login-btn');
const logInError = document.getElementById('login-error');
const logInPageHidden = document.getElementById('login-page');
const dashBoardPageOpen = document.getElementById('dashboard-page');

/// logIN functionality
logInbutton?.addEventListener('click', async function(){
      const userNameValue =  userName.value;
      const passwordValue = password.value;
      userName.value = "";
      password.value = "";

      if(!userNameValue || !passwordValue){
        if(logInError){
            logInError.classList.remove('hidden');
            setTimeout(()=>{
                logInError.classList.add('hidden');
            },2000);
        }
        return;
      }

     try{
         const message = await logInFunction(userNameValue, passwordValue);
         console.log(message);
         fetchProfileUser();
         logInPageHidden?.classList.add('hidden');
         dashBoardPageOpen?.classList.remove('hidden');
         
     }catch(erro){
        console.log(erro);
        if(logInError) {
            logInError.textContent = erro as string;
            logInError.classList.remove('hidden');
            setTimeout(()=>{
                logInError.classList.add('hidden');
            },2000);
        }
        
    }
});


const logInFunction = (username:string, password:string):Promise<string> =>{
     const myP = new MyPromises<string>((complete, reject)=>{
        const validUserName:string = "s";
        const validPassword:string = "1";

        if (username === validUserName && password === validPassword){
            complete("LogIn Successful.");
        }else{
            reject("Invalid Username or Password.");
        }
     });

     return new Promise((resolve, reject )=>{
        myP.then(val => resolve(val));
        myP.catch(err => reject(err));
     })
}


/// Profile Fetch

const profileName = document.getElementById('profile-name');
const profileBalance = document.getElementById('profile-balance');



interface User{
    name:string;
    balance:number;
}

const fetchProfileUser = ():void =>{
    const profileFetch = new MyPromises<User>((complete,reject)=>{
     const userData: User ={
        name: "Shahruk",
        balance: 1000
     }

     complete(userData);
});

profileFetch.then((na)=>{
   if(profileName){
     profileName.textContent = na.name;
     
   }
    if(profileBalance){
     profileBalance.textContent = na.balance.toString();
   }
   
});
}

///send money

const sendAmount = document.getElementById('send-amount') as HTMLInputElement;
const sendButton = document.getElementById('send-btn');
const sendMsg = document.getElementById('send-msg');

sendButton?.addEventListener('click',function(){
   sendMoneyFunction();
});

let currentBalance:number = 1000;

const sendMoneyFunction = ():void =>{
    const sendAmountValue = Number(sendAmount.value);
    const sendMoney = new MyPromises((complete, reject)=>{
    if ( sendAmountValue > currentBalance){
        reject("Insufficient balance.");
    }else{
        complete("Successfully Send Money.");
    }
})

sendMoney.then((msg)=>{
    currentBalance = currentBalance - sendAmountValue; 
    if(profileBalance) profileBalance.textContent =  currentBalance.toString();
    sendAmount.value = "";
    if(sendMsg){
       
        sendMsg.textContent = msg as string;
        sendMsg.style.color = "green";
         sendMsg.classList.remove('hidden');
         setTimeout(()=>{
             sendMsg.classList.add('hidden');
         },2000);

    }
})?.catch((err)=>{
    if(sendMsg){
        sendMsg.textContent = err as string;
        sendMsg.style.color = "red";
        sendMsg.classList.remove('hidden');
         setTimeout(()=>{
             sendMsg.classList.add('hidden');
         },2000);
    }
});
}

/// download 
const downloadButton = document.getElementById('download-btn');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');
const downloadMsg = document.getElementById('download-msg');

downloadButton?.addEventListener('click', function(){
    (downloadButton as HTMLButtonElement).disabled = true;
     fileDownloadFucntion();
});

const fileDownloadFucntion = ():void=>{
    const fileDownload = new MyPromises((complete, reject) => {
    let progress = 0;
    if(progressBarContainer) progressBarContainer.classList.remove('hidden');
    const interval = setInterval(()=>{
        progress += 10;
        if(progressBar) progressBar.style.width = progress + "%";
        if(progress >= 100){
            clearInterval(interval);
            complete("File downloaded successfully");
        }
    },700);

    
});

fileDownload.then((msg)=>{
    if(downloadMsg){
        downloadMsg.classList.remove('hidden');
        downloadMsg.textContent = msg as string;
    }
})
}