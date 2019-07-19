let selectedRow = null;
let formData = {};
let formExpense = {};
let budgetBox = document.getElementById("budget-box")

const onFormSubmit = () => {
  document.getElementById("budgetList").style.visibility = "visible"
  if (validate()) {
    let formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateRecord(formData);
    resetForm();
  }
};

const readFormData = () => {
  formData["project"] = document.getElementById("project").value;
  formData["budget"] = document.getElementById("budget").value;
  console.log(formData);
  return formData;
};

const insertNewRecord = data => {
  document.getElementById("form").style.visibility = "hidden";
  let table = document
    .getElementById("budgetList")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  row1 = newRow.insertCell(0);
  row1.innerHTML = data.project;
  
  budgetBox.style.visibility = "visible"
  budgetBox.innerHTML =  `Presupuesto: ${data.budget}`;
  document.getElementById("foot").innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>
                       <a onClick="addexpense(this)">addexpense</a>`;
};

const resetForm = () => {
  document.getElementById("project").value = "";
  document.getElementById("budget").value = "";
  selectedRow = null;
};

const onEdit = td => {
  document.getElementById("form").style.visibility = "visible";
  document.getElementById("budget").style.visibility = "hidden";
  selectedRow = td.parentElement.parentElement;
  document.getElementById("project").value = row1.innerHTML;
};
const updateRecord = formData => {
  document.getElementById("form").style.visibility = "hidden";
 row1.innerHTML = formData.project;
};

const onDelete = td => {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("budgetList").deleteRow(row.rowIndex);
    let removeBudget = document.getElementById("bb")
    let bdgt = document.getElementById('budget-box')
    removeBudget.removeChild(bdgt);;
    resetForm();
  }
};

const addexpense = () => {
  const innerTable = document.getElementById("secondtable");
  innerTable.innerHTML = `<td>
  <form id="form-expenses" onsubmit="event.preventDefault();onFormSubmit();" autocomplete="off">
      <div>
          <label>$0.00</label><label class="validation-error hide" id="projectValidationError"></label>
          <input type="number" name="quantity" id="quantity" />
      </div>
      <div>
          <label>Concept</label>
          <input type="text" name="concept" id="concept" />
      </div>
      <div>
      <label>Multiplier</label>
      <input type="number" name="multiplier" id="multiplier" />
  </div>
     <a onClick="createExpense(this)">addexpense</a>
  </form>
</td>
<td>`;
};

const createExpense = () => {
  document.getElementById("expensesList").style.visibility = "visible"
  document.getElementById("form-expenses").style.visibility = "hidden"
  let formExpense = expenseData();
  let totalQuantity = formExpense.quantity * formExpense.multiplier;
  let newbudget = formData.budget - totalQuantity;
  formData.budget = newbudget;
  formData.total = totalQuantity;
  row1.innerHTML = formData.budget;
  console.log();
  console.log(formData);
  insertNewExpense(formExpense);
  resetForm();
};

const expenseData = () => {
  formExpense["quantity"] = document.getElementById("quantity").value;
  formExpense["concept"] = document.getElementById("concept").value;
  formExpense["multiplier"] = document.getElementById("multiplier").value;
  console.log(formExpense);

  return formExpense;
};

const onDeleteExpense = td => {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    formData.budget = formData.budget + formData.total;
    row2.innerHTML = formData.budget;
    document.getElementById("expensesList").deleteRow(row.rowIndex);
    resetForm();
  }
};

const insertNewExpense = data => {
  document.getElementById("form").style.visibility = "hidden";
  let tab = document
    .getElementById("expensesList")
    .getElementsByTagName("tbody")[0];
  let newRow = tab.insertRow(tab.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.concept;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.quantity * data.multiplier;
  console.log(data.quantity);
  cell4 = newRow.insertCell(2);
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDeleteExpense(this)">Delete</a>
                       `;
};

const validate = () => {
  isValid = true;
  if (document.getElementById("project").value == "") {
    isValid = false;
    document.getElementById("projectValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .getElementById("projectValidationError")
        .classList.contains("hide")
    )
      document.getElementById("projectValidationError").classList.add("hide");
  }
  return isValid;
};