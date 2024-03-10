const pushBtn = document.getElementById("push");
const sandBtn = document.getElementById("sand");
const pushSpeed = document.getElementById("push-speed")
const sandSpeed = document.getElementById("sand-speed")
const current_heightDisplay = document.getElementById("current_height");
const history_heightDisplay = document.getElementById("history_height");

let Data = {
    current_height:1,
    history_height:1,
    height_per_push:0.1,
    rate_per_sand:1.02
}
let Settings = {
    language:"Chinese",
}

const LanguageContent = {
    Chinese:{
        height_display:{
            current:"西西弗斯将巨石推动了 {height}m 高",
            history:"西西弗斯曾将巨石推动到 {height}m 高"
        },
    }
}

const lang = ()=>LanguageContent[Settings.language];

function ScientificNotationize(value){
    // if(-1e6 < value < 1e6){
    if(true){
        return value.toFixed(3);
    }

    return "tooBig";
}

function UpdateHeightDisplay(){
    Data.history_height = Math.max(Data.history_height,Data.current_height);
    current_height.innerHTML = LanguageContent[Settings.language]["height_display"]["current"].replace("{height}",ScientificNotationize(Data.current_height));
    history_height.innerHTML = LanguageContent[Settings.language]["height_display"]["current"].replace("{height}",ScientificNotationize(Data.history_height));
}

function UpdateSpeedDisplay(){
    pushSpeed.innerHTML = "每次推动将会升高 " + ScientificNotationize(Data.height_per_push) + " m"
    sandSpeed.innerHTML = "每次打磨会让石头快 "+ ScientificNotationize(Data.rate_per_sand) + " 倍"
}

function push(){
    Data.current_height += Data.height_per_push;
    UpdateHeightDisplay();
}

function sand(){
    Data.height_per_push *= Data.rate_per_sand;
    UpdateSpeedDisplay();
}

function Buy(level){
    return function(){

    }
}

pushBtn.addEventListener("click",push);
sandBtn.addEventListener("click",sand);

function init(){
    UpdateHeightDisplay();
}
init()