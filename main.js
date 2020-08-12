var tbl = document.querySelector(".table");
var header = document.querySelector("header");
var form = document.querySelector("form");

var gradeTable = new GradeTable(tbl);
var pageHeader = new PageHeader(header);
var gradeForm = new GradeForm(form);
new App(gradeTable, pageHeader, gradeForm).start();
