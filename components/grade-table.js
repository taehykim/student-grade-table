class GradeTable {
  constructor(tableElement, noGradeText, gradeForm) {
    this.tableElement = tableElement;
    this.noGradeText = noGradeText;
    this.gradeForm = gradeForm;
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
      tbody.appendChild(
        this.renderGradeRow(grades[i], this.deleteGrade, this.gradeForm)
      );
    }
    console.log("grades", grades);
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade, gradeForm) {
    var nameInput = document.getElementById("name");
    var courseInput = document.getElementById("course");
    var gradeInput = document.getElementById("grade");

    var newRow = document.createElement("tr");
    var nameTd = document.createElement("td");
    var courseTd = document.createElement("td");
    var gradeTd = document.createElement("td");
    var buttonTd = document.createElement("td");
    var updateBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");
    var updateIcon = document.createElement("i");
    var deleteIcon = document.createElement("i");
    updateIcon.classList.add("fas", "fa-edit", "fa-2x");
    deleteBtn.classList.add("fas", "fa-trash-alt", "fa-2x");
    buttonTd.append(updateBtn, deleteBtn);
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.classList.add("table-btn");
    deleteBtn.addEventListener("click", function () {
      deleteGrade(data.id);
    });
    updateBtn.appendChild(updateIcon);
    updateBtn.classList.add("table-btn");
    updateBtn.addEventListener("click", function () {
      // var formTag = document.querySelector("form");
      var formTitleText = document.getElementById("form-title-text");
      var addBtn = document.getElementById("form-submit-btn");
      var updateFormBtn = document.getElementById("form-update-btn");

      formTitleText.textContent = "Update Grade";
      nameInput.value = data.name;
      courseInput.value = data.course;
      gradeInput.value = data.grade;

      addBtn.classList.add("d-none");
      updateFormBtn.classList.remove("d-none");

      updateFormBtn.addEventListener("click", function () {
        // console.log("update form button clicked!");
        // console.log("this:", this);
        gradeForm.onUpdateClick(data.id);
      });
    });

    nameTd.textContent = data.name;
    courseTd.textContent = data.course;
    gradeTd.textContent = data.grade;
    newRow.append(nameTd, courseTd, gradeTd, buttonTd);
    return newRow;
  }
}
