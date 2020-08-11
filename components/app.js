class App {
  constructor(gradeTable, pageHeader) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
  }

  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var avgGrade = 0;
    for (var i = 0; i < grades.length; i++) {
      avgGrade += grades[i].grade;
    }
    avgGrade /= grades.length;
    this.pageHeader.updateAverage(avgGrade);
  }
  getGrades() {
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
  }
}
