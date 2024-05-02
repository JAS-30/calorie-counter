//components
let goal = document.getElementById("goal");
let eaten = document.getElementById("eaten");
let calorie = document.getElementById("calorie");
let progressBar = document.querySelector(".circular-progress");
let buttons = document.querySelector(".buttons");

//creation of counter and buttons and adding elements in DOM
toGo = createElement("span","to-go",0);
progressBar.prepend(toGo);

removeButton = createElement("button","remove","-");
buttons.appendChild(removeButton);

addButton = createElement("button","add","+");
buttons.appendChild(addButton);

//variables that measure quantity and progress
let progressValue = 0;
let progressEndValue = 100;
let amount;
let eatenCounter = 0;


//App start
let objective = prompt("Select calorie limit for today: ");
objective = Number(objective);
goal.innerText = objective;
toGo.innerText = objective;


buttons.addEventListener("click", (event) => {
        if(event.target.id === 'add'){
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
                        eaten.innerText = objective;
                        toGo.innerHTML = 0;
                //remove buttons when objective reached
                        addButton.remove();
                        removeButton.remove();
                }
                //update progress if objective not reached
                else{
                        for(let i=progressValue;i<(progressValue + amount); i++){
                                progressBar.style.background = `conic-gradient(
                                #50C878 ${3.6 * i}deg,
                                #cadcff ${3.6 * i}deg
                                )`;
                        }
                        progressValue += amount;
                        eatenCounter += parseInt(calorie.value);
                        eaten.innerText = eatenCounter;
                        toGo.innerHTML = objective - eatenCounter;
                }
        }

        if(event.target.id === 'remove'){
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
                        eaten.innerText = eatenCounter;
                        toGo.innerHTML = objective - eatenCounter;
                }
        }
});

//function to calculate percentage of chosen amount
function amountPercentage(calorieValue){
//if user clicks the buttons without selecting a number
        if(isNaN(calorieValue)){
                calorie.value = 0;
                return 0;
}
        else{
                let res = Math.ceil((calorieValue / objective) * 100);
                return res;
}
}

//function to create an element by: type,id,innerHTML
function createElement(type,elementId,inner_html){
        let newElement = document.createElement(type);
        newElement.id = elementId;
        newElement.innerHTML = inner_html;
        return newElement;

}