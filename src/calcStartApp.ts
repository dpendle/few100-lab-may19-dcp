import { InputMustBePosNumOnly } from './helperFuncs'
let tipButtons: NodeList;
let inputAmount: HTMLInputElement;
let tipPercentLabel: HTMLElement;
let billedAmountLabel: HTMLElement;
let appliedTipLabel: HTMLElement;
let totalLabel: HTMLElement;
let textTip: HTMLElement;
let currentButtonValue = "20";

export function calcStart() {
    tipButtons = document.querySelectorAll('.btn');
    inputAmount = document.getElementById('enteredAmount') as HTMLInputElement;
    tipPercentLabel = document.getElementById('tipPercentage');
    billedAmountLabel = document.getElementById('billAmount');
    appliedTipLabel = document.getElementById('tipApplied');
    totalLabel = document.getElementById('totalToPay');
    textTip = document.getElementById('textTip');

    inputAmount.addEventListener('keyup', verifyInput);

    tipButtons.forEach((button: HTMLButtonElement) => {
        button.addEventListener('click', switchButtons);
    });
}

function switchButtons() {
    tipButtons.forEach((button: HTMLButtonElement) => {
        if (this === button) {
            button.disabled = true;
            currentButtonValue = button.value;
        }
        else {
            button.disabled = false;
        }
    })
    verifyInput();
}

function verifyInput() {
    inputAmount = document.getElementById('enteredAmount') as HTMLInputElement;
    inputAmount.classList.remove('is-invalid');
    if (InputMustBePosNumOnly(inputAmount)) {
        populateFields();
        return;
    }
    if (inputAmount.value === "") {
        fillDataFields("", "", "", "");
        return;
    }
    inputAmount.value = "";
    inputAmount.classList.add('is-invalid');
    fillDataFields("", "", "", "");
}

function populateFields() {
    let tipPercent: number;
    let tipAmount: number;
    let amountBilled = parseFloat(inputAmount.value);
    let percentLabel: string
    tipButtons.forEach((button: HTMLButtonElement) => {
        if (button.value === currentButtonValue) {
            percentLabel = button.innerText;
            tipPercent = parseFloat(button.value) / 100;
        }
    })
    tipAmount = amountBilled * tipPercent;
    fillDataFields(inputAmount.value, percentLabel, tipAmount.toFixed(2).toString(), (amountBilled + tipAmount).toFixed(2).toString());
}

function fillDataFields(bill: string, tipPerc: string, appliedTip: string, total: string) {
    billedAmountLabel.innerText = `Billed Amount: ${bill}`;
    tipPercentLabel.innerText = `Tip Percentage: ${tipPerc}`;
    appliedTipLabel.innerText = `Amount of Tip: ${appliedTip}`;
    totalLabel.innerText = `Total To Be Paid: ${total}`;
    textTip.innerText = `You are tipping ${currentButtonValue}%`
}

