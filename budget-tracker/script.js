//References to the DOM elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addButton = document.getElementById('add');
const entriesTableBody = document.querySelector('#entries tbody');
const totalIncomeDisplay = document.getElementById('totalIncomeDisplay');
const totalExpensesDisplay = document.getElementById('totalExpensesDisplay');
const balanceDisplay = document.getElementById('balanceDisplay');
const ctx = document.getElementById('budgetChart').getContext('2d');
//Event listener for the "Add" button to trigger the "addEntry" function
addButton.addEventListener('click', addEntry);
//Function to handle the logic when "Add" is clicked
function addEntry() {
    //Get the user input from the form
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    //Validate user input
    if (!description || isNaN(amount)) {
        alert('Please enter valid description and amount!');
        return;
    }
    //New table row creation, so it would display new entry
    const newRow = entriesTableBody.insertRow();
    //Create cells for the new row for the description, amount, type, and action (delete)
    const descriptionCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const typeCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);
    //Populate cells with the user input
    descriptionCell.textContent = description;
    amountCell.textContent = amount.toFixed(2);
    typeCell.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    //Creation of "Delete" button, so the user would be able to delete an entry
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //Event listener for the "Delete" button
    deleteButton.addEventListener('click', function() {
        entriesTableBody.removeChild(newRow);
    });
    actionCell.appendChild(deleteButton);
    updateDisplay();
}
//Update the display "updateDisplay" functions will calculate the total income, expenses and balance based on the entries.
function updateDisplay() {
    const rows = document.querySelectorAll("#entries tbody tr");
    let totalIncome = 0;
    let totalExpenses = 0;

    rows.forEach(row => {
        const amount = parseFloat(row.cells[1].textContent);
        const type = row.cells[2].textContent;

        if (type === "Income") {
            totalIncome += amount;
        } else if (type === "Expense") {
            totalExpenses += amount;
        }
    });
    
    const balance = totalIncome - totalExpenses;

    totalIncomeDisplay.textContent = totalIncome.toFixed(2);
    totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
    balanceDisplay.textContent = balance.toFixed(2);
}
updateDisplay();

function renderChart(income, expenses) {
    
}
