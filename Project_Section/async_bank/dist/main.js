var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MyPromises } from "./myPromise.js";
const userName = document.getElementById('username');
const password = document.getElementById('password');
const logInbutton = document.getElementById('login-btn');
const logInError = document.getElementById('login-error');
const logInPageHidden = document.getElementById('login-page');
const dashBoardPageOpen = document.getElementById('dashboard-page');
/// logIN functionality
logInbutton === null || logInbutton === void 0 ? void 0 : logInbutton.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const userNameValue = userName.value;
        const passwordValue = password.value;
        userName.value = "";
        password.value = "";
        if (!userNameValue || !passwordValue) {
            if (logInError) {
                logInError.classList.remove('hidden');
                setTimeout(() => {
                    logInError.classList.add('hidden');
                }, 2000);
            }
            return;
        }
        try {
            const message = yield logInFunction(userNameValue, passwordValue);
            console.log(message);
            fetchProfileUser();
            logInPageHidden === null || logInPageHidden === void 0 ? void 0 : logInPageHidden.classList.add('hidden');
            dashBoardPageOpen === null || dashBoardPageOpen === void 0 ? void 0 : dashBoardPageOpen.classList.remove('hidden');
        }
        catch (erro) {
            console.log(erro);
            if (logInError) {
                logInError.textContent = erro;
                logInError.classList.remove('hidden');
                setTimeout(() => {
                    logInError.classList.add('hidden');
                }, 2000);
            }
        }
    });
});
const logInFunction = (username, password) => {
    const myP = new MyPromises((complete, reject) => {
        const validUserName = "s";
        const validPassword = "1";
        if (username === validUserName && password === validPassword) {
            complete("LogIn Successful.");
        }
        else {
            reject("Invalid Username or Password.");
        }
    });
    return new Promise((resolve, reject) => {
        myP.then(val => resolve(val));
        myP.catch(err => reject(err));
    });
};
/// Profile Fetch
const profileName = document.getElementById('profile-name');
const profileBalance = document.getElementById('profile-balance');
const fetchProfileUser = () => {
    const profileFetch = new MyPromises((complete, reject) => {
        const userData = {
            name: "Shahruk",
            balance: 1000
        };
        complete(userData);
    });
    profileFetch.then((na) => {
        if (profileName) {
            profileName.textContent = na.name;
        }
        if (profileBalance) {
            profileBalance.textContent = na.balance.toString();
        }
    });
};
///send money
const sendAmount = document.getElementById('send-amount');
const sendButton = document.getElementById('send-btn');
const sendMsg = document.getElementById('send-msg');
sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', function () {
    sendMoneyFunction();
});
let currentBalance = 1000;
const sendMoneyFunction = () => {
    var _a;
    const sendAmountValue = Number(sendAmount.value);
    const sendMoney = new MyPromises((complete, reject) => {
        if (sendAmountValue > currentBalance) {
            reject("Insufficient balance.");
        }
        else {
            complete("Successfully Send Money.");
        }
    });
    (_a = sendMoney.then((msg) => {
        currentBalance = currentBalance - sendAmountValue;
        if (profileBalance)
            profileBalance.textContent = currentBalance.toString();
        sendAmount.value = "";
        if (sendMsg) {
            sendMsg.textContent = msg;
            sendMsg.style.color = "green";
            sendMsg.classList.remove('hidden');
            setTimeout(() => {
                sendMsg.classList.add('hidden');
            }, 2000);
        }
    })) === null || _a === void 0 ? void 0 : _a.catch((err) => {
        if (sendMsg) {
            sendMsg.textContent = err;
            sendMsg.style.color = "red";
            sendMsg.classList.remove('hidden');
            setTimeout(() => {
                sendMsg.classList.add('hidden');
            }, 2000);
        }
    });
};
/// download 
const downloadButton = document.getElementById('download-btn');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');
const downloadMsg = document.getElementById('download-msg');
downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener('click', function () {
    downloadButton.disabled = true;
    fileDownloadFucntion();
});
const fileDownloadFucntion = () => {
    const fileDownload = new MyPromises((complete, reject) => {
        let progress = 0;
        if (progressBarContainer)
            progressBarContainer.classList.remove('hidden');
        const interval = setInterval(() => {
            progress += 10;
            if (progressBar)
                progressBar.style.width = progress + "%";
            if (progress >= 100) {
                clearInterval(interval);
                complete("File downloaded successfully");
            }
        }, 700);
    });
    fileDownload.then((msg) => {
        if (downloadMsg) {
            downloadMsg.classList.remove('hidden');
            downloadMsg.textContent = msg;
        }
    });
};
//# sourceMappingURL=main.js.map