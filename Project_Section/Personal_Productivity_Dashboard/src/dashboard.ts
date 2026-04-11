

/*
সময় 5 - 11 → "Good Morning"
সময় 12 - 17 → "Good Afternoon"  
সময় 18 - 21 → "Good Evening"
সময় 22 - 4 → "Good Night"
*/
// for greeting header
const userName =  localStorage.getItem('userName');
const greetings = document.getElementById('greetings') as HTMLElement;

const hour = new Date().getHours();
let greetingText = "";

if (hour >= 5 && hour < 12){
    greetingText = "Good Morning";
}else if(hour >= 12 && hour < 18){
    greetingText = "Good Afternoon";
}else if(hour >= 18 && hour < 22){
    greetingText = "Good Evening";
}else{
    greetingText = "Good Night";
}

greetings.textContent = `${greetingText}, ${userName}!`;




// write code for habit tracker
const incrButton = document.getElementById('inc');
const decrButton = document.getElementById('dec');
const resetButton = document.getElementById('reset');
const showCount = document.getElementById('show-count');


// add event listtener
const counter = makeCounter();
incrButton?.addEventListener('click',function(){
   counter.increment();
   if(showCount){
    showCount.textContent = String(counter.getCount());
   }
})
decrButton?.addEventListener('click',function(){
    counter.decrement();
    if(showCount){
    showCount.textContent = String(counter.getCount());
   }
})
resetButton?.addEventListener('click',function(){
    counter.reset();
    if(showCount){
    showCount.textContent = String(counter.getCount());
   }
})

function makeCounter(){
    let count:number = 0;
    function increment(){
        return ++count;
    }
    function decrement(){
        return --count;
    }
    function reset(){
        count = 0;
    }
    function getCount(){
        return count;
    }

    return{increment, decrement, reset, getCount};
}

// write code for bill calculator
const totalBill = document.getElementById('totalbill') as HTMLInputElement;
const totalPerson = document.getElementById('totalPerson') as HTMLInputElement;
const billresult = document.getElementById('billresult');
const billCalculate = document.getElementById('billCalculate');

billCalculate?.addEventListener('click',function(){
   const billValue = totalBill.value;
   const personValue = totalPerson.value;

   const cal = makeCalculator();
   cal.add(Number(billValue));
   cal.divided(Number(personValue));
   if(billresult){
    billresult.textContent = `Per Person ${cal.getRes().toFixed(2)} taka.`;
   }
}); 


function makeCalculator(){
    let result:number = 0;
    return{
        add: function(n:number){
            result = result + n;
            return result;
        },
        divided: function(n:number){
              result =  result / n;
              return result;
        },
        getRes:function(){ return result}
    }
}

