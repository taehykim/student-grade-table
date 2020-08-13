class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.formElement.addEventListener("submit", this.handleSubmit.bind(this));
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.formElement.lastElementChild.addEventListener(
      "click",
      this.onCancelClick
    );
  }

  onSubmit(createGrade, updateGrade) {
    this.createGrade = createGrade;
    this.updateGrade = updateGrade;
  }

  onUpdateClick(id) {
    console.log("inside onUpdateClick in GradeForm");
    console.log("id", id);
    this.dataId = id;
  }

  onCancelClick() {
    console.log("cancel clicked!");
    var addBtn = document.getElementById("form-submit-btn");
    var updateBtn = document.getElementById("form-update-btn");
    this.formElement.previousElementSibling.textContent = "Add Grade";
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    // this.formElement.reset();
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Hi from GradeForm's handleSubmit method");
    console.log(this.dataId);

    // console.log(event.target);
    // console.log(this.formElement);
    // why does the instruction ask us to do event.target when we already have this.formElement?
    // var newFormData = new FormData(this.formElement);
    var newFormData = new FormData(event.target);
    var name = newFormData.get("name");
    var course = newFormData.get("course");
    var grade = newFormData.get("grade");

    if (this.dataId) {
      console.log("about the update");
      this.updateGrade(this.dataId, name, course, grade);
      this.dataId = null;
    } else {
      console.log("about to create");
      this.createGrade(name, course, grade);
    }

    event.target.reset();
  }
}
