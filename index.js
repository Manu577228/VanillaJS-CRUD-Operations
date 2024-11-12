let selectedRow = null;

function addData() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  if (!name || !age) {
    alert("Please fill all fields");
    return;
  }

  const dataList = JSON.parse(localStorage.getItem("crudData")) || [];
  dataList.push({ name, age });
  localStorage.setItem("crudData", JSON.stringify(dataList));

  resetForm();
  renderData();
}

function renderData() {
  const dataList = JSON.parse(localStorage.getItem("crudData")) || [];
  const dataTable = document.getElementById("dataList");

  dataTable.innerHTML = "";

  dataList.forEach((data, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editData(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData(${index})">Delete</button>
            </td>
        `;
    dataTable.appendChild(row);
  });
}

function editData(index) {
  const dataList = JSON.parse(localStorage.getItem("crudData")) || [];
  selectedRow = index;

  document.getElementById("name").value = dataList[index].name;
  document.getElementById("age").value = dataList[index].age;

  document.querySelector(".btn-success").style.display = "none";
  document.querySelector(".btn-primary").style.display = "inline-block";
}

function updateData() {
  if (selectedRow === null) return;

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  if (!name || !age) {
    alert("Please fill all fields");
    return;
  }

  const dataList = JSON.parse(localStorage.getItem("crudData")) || [];
  dataList[selectedRow] = { name, age };
  localStorage.setItem("crudData", JSON.stringify(dataList));

  resetForm();
  renderData();
}

function deleteData(index) {
  const dataList = JSON.parse(localStorage.getItem("crudData")) || [];
  dataList.splice(index, 1);
  localStorage.setItem("crudData", JSON.stringify(dataList));

  renderData();
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";

  document.querySelector(".btn-success").style.display = "inline-block";
  document.querySelector(".btn-primary").style.display = "none";

  selectedRow = null;
}

document.addEventListener("DOMContentLoaded", renderData);
