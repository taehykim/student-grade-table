var tbl = document.querySelector(".table");
var header = document.querySelector("header");
var form = document.querySelector("form");
var noGradeText = document.getElementById("no-grades");
// var gradesArr = [];

var gradeForm = new GradeForm(form);
var gradeTable = new GradeTable(tbl, noGradeText, gradeForm);
var pageHeader = new PageHeader(header);
// var gradeForm = new GradeForm(form);
new App(gradeTable, pageHeader, gradeForm).start();
