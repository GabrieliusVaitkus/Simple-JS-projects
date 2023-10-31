//References to the DOM elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addButton = document.getElementById('add');
const entriesTableBody = document.querySelector('#entries tbody');
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
    typeCell.textContent = type;
    //Creation of "Delete" button, so the user would be able to delete an entry
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //Event listener for the "Delete" button
    deleteButton.addEventListener('click', function() {
        entriesTableBody.removeChild(newRow);
    });
    actionCell.appendChild(deleteButton);
}
