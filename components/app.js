class App {
  constructor(gradeTable) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.gradeTable = gradeTable;
  }

  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
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
