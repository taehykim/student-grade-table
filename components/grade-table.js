class GradeTable {
  constructor(tableElement, noGradeText) {
    this.tableElement = tableElement;
    this.noGradeText = noGradeText;
  }
  updateGrades(grades) {
    if (grades.length === 0) {
      this.noGradeText.classList.remove("d-none");
    } else {
      this.noGradeText.classList.add("d-none");
    }

    var tbody = this.tableElement.querySelector("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    for (var i = 0; i < grades.length; i++) {
      tbody.appendChild(this.renderGradeRow(grades[i], this.deleteGrade));
    }
    console.log("grades", grades);
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade) {
    var newRow = document.createElement("tr");
    var nameTd = document.createElement("td");
    var courseTd = document.createElement("td");
    var gradeTd = document.createElement("td");
    var buttonTd = document.createElement("td");
    var deleteBtn = document.createElement("button");
    buttonTd.appendChild(deleteBtn);
    deleteBtn.style.type = "button";
    deleteBtn.classList.add("btn", "btn-light");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteGrade(data.id);
    });

    nameTd.textContent = data.name;
    courseTd.textContent = data.course;
    gradeTd.textContent = data.grade;
    newRow.append(nameTd, courseTd, gradeTd, buttonTd);
    return newRow;
  }
}
