//components
let goal = document.getElementById("goal");
let eaten = document.getElementById("eaten");
let calorie = document.getElementById("calorie");
let progressBar = document.querySelector(".circular-progress");
let buttons = document.querySelector(".buttons");

//creation of counter and buttons

toGo = document.createElement("span");
toGo.id = "to-go";
progressBar.prepend(toGo);

removeButton = document.createElement("button");
removeButton.id = "remove";
removeButton.innerHTML = "-"
buttons.appendChild(removeButton);

addButton = document.createElement("button");
addButton.id = "add";
addButton.innerHTML = "+";
buttons.appendChild(addButton);

//variables that measure quantity and progress
let progressValue = 0;
let progressEndValue = 100;
let amount;
let eatenCounter = 0;


//select calories
let objective = prompt("Select calorie limit for today: ");
objective = Number(objective);
//update values with target
goal.innerText = objective;
toGo.innerText = objective;

//add button
    addButton.addEventListener("click",()=>{
        amount = amountPercentage(parseInt(calorie.value));
//if objective reached with next click
        if((progressValue + amount)>=progressEndValue){
        alert("Objective reached! Refresh to restart.");
//fill circular bar
       for(let i=progressValue;i<progressEndValue; i++){
        progressBar.style.background = `conic-gradient(
        #50C878 ${3.6 * i}deg,
        #cadcff ${3.6 * i}deg
        )`;
        }
    
//update values
        eaten.innerText = objective;
        toGo.innerHTML = 0;

//remove buttons
        addButton.remove();
        removeButton.remove();
        }
//update progress 
        else{
        for(let i=progressValue;i<(progressValue + amount); i++){
        progressBar.style.background = `conic-gradient(
        #50C878 ${3.6 * i}deg,
        #cadcff ${3.6 * i}deg
        )`;
        }
        progressValue += amount;
        eatenCounter += parseInt(calorie.value);
//update values
        eaten.innerText = eatenCounter;
        toGo.innerHTML = objective - eatenCounter;
    }
    });
    

//remove button
    removeButton.addEventListener("click",()=>{
        amount = amountPercentage(parseInt(calorie.value));
//if remove below 0
        if((progressValue - amount)<0){
        for(let i=progressValue;i>0; i--){
        progressBar.style.background = `conic-gradient(
        #50C878 ${3.6 * i}deg,
        #cadcff ${3.6 * i}deg
        )`;
        }
        progressValue = 0;
//update values
        eatenCounter = 0;
        eaten.innerText = progressValue;
        toGo.innerHTML = objective - progressValue;
        }
//remove progress
        else{
        for(let i=progressValue;i>(progressValue - amount); i--){
        progressBar.style.background = `conic-gradient(
        #50C878 ${3.6 * i}deg,
        #cadcff ${3.6 * i}deg
        )`;
        }
        progressValue -=amount;
        eatenCounter -= parseInt(calorie.value);
//update values
        eaten.innerText = eatenCounter;
        toGo.innerHTML = objective - eatenCounter;
        }
        
    });


//percentage of chosen amount

function amountPercentage(calorieValue){
//if user clicks buttons without selecting a number
 if(isNaN(calorieValue)){
calorie.value = 0;
return 0;
}
else{
let res = Math.ceil((calorieValue / objective) * 100);
return res;
}
}