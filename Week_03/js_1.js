
// implement event emitter

class MyEventEmitter{
    constructor(){
      this.events = {};
    }

    on(event, listener){
      if(!this.events[event]){
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }

    emit(event, ...args){
      if(!this.events[event]) return;
      this.events[event].forEach(listener => listener(...args));
    }

    off(event, listener){
      if(!this.events[event]) return;
      this.events[event] = this.events[event].filter(fn => fn !== listener);
    }
    }

    const emitter = new MyEventEmitter();
    function onLogIn(user){
      console.log(user + " logged in ");
      
    }
    function logOutAlert(user){
      console.log("Alert: " +user+ " just logged out.");
      
    }

    emitter.on("login", onLogIn);
    emitter.on("logout", logOutAlert);

    emitter.emit("login", "Shahruk"); // Shahruk logged in 
    emitter.emit("logout", "Shahruk"); // Alert: Shahruk just logged out.
           
    emitter.off("login", onLogIn);
    emitter.emit("login", "Shahruk");
    // no login outptu here 
