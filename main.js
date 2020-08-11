var tbl = document.querySelector(".table");
var header = document.querySelector("header");
var gradeTable = new GradeTable(tbl);
var pageHeader = new PageHeader(header);
new App(gradeTable, pageHeader).start();
