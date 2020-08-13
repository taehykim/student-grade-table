class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
    this.handleUpdateGradeError = this.handleUpdateGradeError.bind(this);
    this.handleUpdateGradeSuccess = this.handleUpdateGradeSuccess.bind(this);
  }

  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    console.log("inside handleGetGradesSuccess");
    this.gradeTable.updateGrades(grades);
    if (grades.length === 0) {
      this.pageHeader.updateAverage(0);
    } else {
      var avgGrade = 0;
      for (var i = 0; i < grades.length; i++) {
        avgGrade += grades[i].grade;
      }
      avgGrade /= grades.length;
      this.pageHeader.updateAverage(Math.floor(avgGrade));
    }
  }
  getGrades() {
    console.log("inside getGrades");
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data: null,
      headers: { "X-Access-Token": "6s9tKlWv" },
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError,
    });
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade, this.updateGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    // this.gradeTable.onUpdateClick(this.updateGrade);
  }

  createGrade(name, course, grade) {
    console.log("this inside createGrade:", this);
    console.log("Name:", name, "Course:", course, "Grade:", grade);
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: { "X-Access-Token": "6s9tKlWv" },
      data: {
        name: name,
        course: course,
        grade: grade,
      },
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError,
    });
  }

  handleCreateGradeError(error) {
    console.error(error);
  }

  handleCreateGradeSuccess() {
    this.getGrades();
  }

  deleteGrade(id) {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: { "X-Access-Token": "6s9tKlWv" },
      data: null,
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError,
    });
  }

  handleDeleteGradeError(error) {
    console.error(error);
  }

  handleDeleteGradeSuccess() {
    this.getGrades();
  }

  updateGrade(id, name, course, grade) {
    // console.log("hi from updateGrade");
    // console.log("id:", id, "name:", name, "course:", course, "grade:", grade);
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: { "X-Access-Token": "6s9tKlWv" },
      data: { name: name, course: course, grade: grade },
      success: this.handleUpdateGradeSuccess,
      error: this.handleUpdateGradeError,
    });
  }

  handleUpdateGradeError(error) {
    console.error(error);
  }

  handleUpdateGradeSuccess() {
    var formTitleText = document.getElementById("form-title-text");
    formTitleText.textContent = "Add Grade";
    var addBtn = document.getElementById("form-submit-btn");
    var updateBtn = document.getElementById("form-update-btn");
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    console.log("inside handle update grade success function");
    this.getGrades();
  }
}
