class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
  }

  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    console.log("inside handleGetGradesSuccess");
    this.gradeTable.updateGrades(grades);
    var avgGrade = 0;
    for (var i = 0; i < grades.length; i++) {
      avgGrade += grades[i].grade;
    }
    avgGrade /= grades.length;
    this.pageHeader.updateAverage(Math.floor(avgGrade));
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
    this.gradeForm.onSubmit(this.createGrade);
  }

  createGrade(name, course, grade) {
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
    console.log("inside handleCreateGradeSuccess");
    this.getGrades();
  }
}
