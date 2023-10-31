const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addButton = document.getElementById('add');
const entriesTableBody = document.querySelector('#entries tbody');

addButton.addEventListener('click', addEntry);

function addEntry() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (!description || isNaN(amount)) {
        alert('Please enter valid description and amount!');
        return;
    }

    const newRow = entriesTableBody.insertRow();

    const descriptionCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const typeCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    descriptionCell.textContent = description;
    amountCell.textContent = amount.toFixed(2);
    typeCell.textContent = type;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        entriesTableBody.removeChild(newRow);
    });
    actionCell.appendChild(deleteButton);
}
