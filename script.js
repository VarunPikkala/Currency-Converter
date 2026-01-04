const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const btn = document.querySelector(".xchng");
const dropDown = document.querySelectorAll(".dropdown select");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const mode = document.querySelector(".mode");

for (let select of dropDown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === 'to' && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let country = countryList[currCode]
    let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}

const exchangeRate = (amt, rate) => {
    let intAmt = Number(amt);
    return intAmt * rate;
}

const updateExchangeValue = async () => {
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if (amtVal === '' || amtVal < 1) {
        alert("Enter Valid Amount");
        amt.value = 1;
    }
    console.log(from.value, to.value);
    const URL = `${baseURL}/${from.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    let exchangeAmount = exchangeRate(amtVal, rate).toFixed(2);
    console.log(exchangeAmount);
    msg.innerText = `${amtVal} ${from.value} = ${exchangeAmount} ${to.value}`;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    await updateExchangeValue();
});



mode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    mode.classList.toggle("clicked");
    mode.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

window.addEventListener("load", async () => {
    await updateExchangeValue();
})



