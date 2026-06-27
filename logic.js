let Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropDowns = document.querySelectorAll("select");
let img = document.querySelectorAll("img");
let btn = document.querySelector("button");
let inputs = document.querySelectorAll("input");
let clickCount = 0;
let swapClickCount = 0;
let swapBtn = document.querySelector(".swap-btn");
let swapImg = document.querySelector(".swap-img");

for (select of dropDowns)   {
    for(currCode in countryList)    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        newOption.classList.add("text");

        if(select.name == "from" && currCode == "USD")  {
            newOption.selected = "selected";
        }
        else if(select.name == "to" && currCode == "INR")  {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (select) => {
    let currCode = select.value;
    let conCode = countryList[currCode];
    let img = select.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${conCode}/flat/48.png`;
};

for(input of inputs)    {
    input.addEventListener("click", () =>   {
        if(clickCount == 0)    {
            inputs[0].value="";
            inputs[1].value="";
            clickCount++;
        }
    })
}

const updateExchangeRate = async () => {

    inputs[1].value = inputs[1].value.replace(/,/g, "");
    if(inputs[0].value == "" || inputs[0].value <= 0)    {
        inputs[0].value=1; 
    }

    const url = `${Base_URL}/${dropDowns[0].value.toLowerCase()}.json`;
    const response = await fetch(url);
    const data = await response.json();

    let conRate = data[dropDowns[0].value.toLowerCase()][dropDowns[1].value.toLowerCase()];

    exchangeRate = inputs[0].value * conRate;

    inputs[1].value = exchangeRate.toLocaleString("en-US",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );
};

btn.addEventListener("click", (event) =>  {
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

let degree = 0;

swapBtn.addEventListener("click", () => {

    let temp = dropDowns[0].value;
    dropDowns[0].value = dropDowns[1].value;
    dropDowns[1].value = temp;

    let tempImg = img[0].src;
    img[0].src = img[2].src;
    img[2].src = tempImg;

    let tempInput = inputs[0].value;
    inputs[0].value = Number(inputs[1].value.replace(/,/g, "")); 
    inputs[1].value = Number(tempInput).toLocaleString("en-US",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );

    degree = degree+180;
    swapImg.style.transform = `rotate(${degree}deg)`;
    swapImg.style.transition = "transform 0.3s ease";
    swapClickCount++;
    
});