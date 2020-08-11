class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }
  updateGrades(grades) {
    var tbody = this.tableElement.querySelector("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    for (var i = 0; i < grades.length; i++) {
      var newRow = document.createElement("tr");
      var nameTd = document.createElement("td");
      var courseTd = document.createElement("td");
      var gradeTd = document.createElement("td");

      nameTd.textContent = grades[i].name;
      courseTd.textContent = grades[i].course;
      gradeTd.textContent = grades[i].grade;
      newRow.append(nameTd, courseTd, gradeTd);
      tbody.appendChild(newRow);
    }
    console.log(grades);
  }
}
