class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.formElement.addEventListener("submit", this.handleSubmit.bind(this));
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("Hi from GradeForm's handleSubmit method");
    // console.log(event.target);
    // console.log(this.formElement);
    // why does the instruction ask us to do event.target when we already have this.formElement?
    var newFormData = new FormData(event.target);
    var name = newFormData.get("name");
    var course = newFormData.get("course");
    var grade = newFormData.get("grade");
    this.createGrade(name, course, grade);
    event.target.reset();
  }
}
