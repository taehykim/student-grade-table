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
    this.cacheGrades = this.cacheGrades.bind(this);
    // this.gradesArr = gradesArr;
  }

  cacheGrades(grades, deletingId, updatingId) {
    console.log("hello from cacheGrades");
    console.log("deletingId:", deletingId);
    console.log("updatingId:", updatingId);
    console.log("grades", grades);

    if (!this.gradesArr) {
      console.log("hello");
      this.gradesArr = [];
    }

    if (deletingId) {
      console.log("cacheGrades deleting");
      for (var i = 0; i < this.gradesArr.length; i++) {
        console.log("inside for loop");
        console.log(this.gradesArr[i].id);
        if (this.gradesArr[i].id === deletingId) {
          this.gradesArr.splice(i, 1);
          console.log("gradesArr after deleting:", this.gradesArr);

          return;
        }
      }
    }

    if (updatingId) {
      console.log("cacheGrades updating");
      for (var j = 0; j < this.gradesArr.length; j++) {
        console.log("inside updating for loop");
        console.log(this.gradesArr[j].id);
        if (this.gradesArr[j].id === updatingId) {
          this.gradesArr.splice(j, 1, grades);
          console.log("gradesArr after updating:", this.gradesArr);
          return;
        }
      }
    }

    this.gradesArr.push(grades);
    console.log("grade caching array:", this.gradesArr);
  }

  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    console.log("inside handleGetGradesSuccess");
    if (!this.gradesArr) {
      this.gradesArr = [];
      this.gradesArr.push(...grades);
    }
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
    if (this.gradesArr) {
      // console.log("not calling ajax~ using cached version");
      this.handleGetGradesSuccess(this.gradesArr);
    } else {
      // console.log("this.gradeArr", this.gradesArr);
      $.ajax({
        method: "GET",
        url: "https://sgt.lfzprototypes.com/api/grades",
        data: null,
        headers: { "X-Access-Token": "6s9tKlWv" },
        success: this.handleGetGradesSuccess,
        error: this.handleGetGradesError,
      });
    }
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade, this.updateGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    // this.gradeTable.onUpdateClick(this.updateGrade);
    console.log("starting grades array:", this.gradesArr);
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

  handleCreateGradeSuccess(grade) {
    console.log("grade from handleCreateGradeSuccess:", grade);
    this.cacheGrades(grade, null, null);
    this.getGrades();
  }

  deleteGrade(id) {
    this.deleteingId = id;
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
    console.log(this.deleteingId);
    var deleteId = this.deleteingId;
    this.cacheGrades(null, deleteId, null);
    this.getGrades();
  }

  updateGrade(id, name, course, grade) {
    this.updatingId = id;
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

  handleUpdateGradeSuccess(grade) {
    console.log("updating grade:", grade);
    var formTitleText = document.getElementById("form-title-text");
    formTitleText.textContent = "Add Grade";
    var addBtn = document.getElementById("form-submit-btn");
    var updateBtn = document.getElementById("form-update-btn");
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    console.log("inside handle update grade success function");
    var updateId = this.updatingId;
    this.cacheGrades(grade, null, updateId);
    this.getGrades();
  }
}
