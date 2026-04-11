const loginName = document.getElementById('name') as HTMLInputElement;

const loginPassword = document.getElementById('password') as HTMLInputElement;

const loginbutton = document.getElementById('login-btn') as HTMLButtonElement;


const login = makeLogInLimiter(3);
const limiter = createRateLimiter(3, 5000);

loginbutton?.addEventListener('click',function(){

  limiter(()=>{
      logInFunctionality();
  });
});


function createRateLimiter(maxCall:number, windowMs:number){
      let countCall:number = 0;
      let windowStart = Date.now();

      return function(fn: () => void){
         const now = Date.now();
         if(now - windowStart > windowMs){
            countCall = 0;
            windowStart = now;
         }
         if(countCall < maxCall){
            countCall ++;
            fn();
         }else{
            let countdown = 5;
            // loginName.disabled = true;
            // loginPassword.disabled = true;
            loginbutton.disabled = true;

             const rateMsg = document.getElementById('rate-msg');
             const timer = setInterval(function(){
               if (rateMsg){
               rateMsg.textContent = `Too many attempts! Wait ${countdown} seconds...`;
             }
             countdown --;
            if(countdown < 0){
               clearInterval(timer);
               loginbutton.disabled = false;
               if(rateMsg) rateMsg.textContent = "";
            }
             },1000);
         }
      }
}


function logInFunctionality(){
    const passwordValue = loginPassword.value;
    login(passwordValue);
    if(passwordValue === "hello123"){
      const nameValue = loginName.value;
      localStorage.setItem('userName', nameValue );
      window.location.href = 'dashboard.html';
    }
}


function makeLogInLimiter(maxAttemps:number){
   let attempts:number = 0;
   return function(password:string){
      if(password === "hello123"){
         console.log("LogInSuccesfull");
         return;
      }

      if(attempts >= maxAttemps){
         console.log("LogIn Block!");
         
      }else{
         attempts ++;
         console.log(`${maxAttemps - attempts} attempts left.`);
         
      }
   }
}

