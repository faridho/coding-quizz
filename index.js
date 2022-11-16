document.addEventListener("DOMContentLoaded", () => {
  const dataOption = [".reduce", "initializer", "currentValue", "accumulator"];
  const options = document.getElementById("options");

  dataOption.forEach((element, index) => {
    options.innerHTML +=
      '<div draggable="true" class="box option" id="option-' +
      index +
      '">' +
      element +
      "</div>";
  });

  let items = document.querySelectorAll(".box");
  let mapOfAnswer = [];
  let dragSrcElement = null;
  let id = "";

  const handleDragStart = function (e) {
    dragSrcElement = this;
    id = this.getAttribute("id");

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  };

  const handleDragOver = function (e) {
    e.preventDefault();
    return false;
  };

  const refresh = document.getElementById("refresh");
  const handleDrop = function (e) {
    e.stopPropagation();
    const newHtml = e.dataTransfer.getData("text/html");
    if (dragSrcElement !== this) {
      if (!this.innerHTML && dragSrcElement.innerHTML) {
        dragSrcElement.classList.add("question");
        dragSrcElement.classList.remove("option");

        this.classList.add("option");
        this.classList.remove("question");
      }

      const attributeOriginID = dragSrcElement.getAttribute("id");
      const attributesOrigin = attributeOriginID.split("-");

      const attributeDestID = this.getAttribute("id");
      const attributesDest = attributeDestID.split("-");

      switch (true) {
        case attributesOrigin[0] === "option" &&
          attributesDest[0] === "question":
          mapOfAnswer[attributesDest[1]] = dragSrcElement.textContent;
          break;
        case attributesOrigin[0] === "question" &&
          attributesDest[0] === "question":
          mapOfAnswer[attributesDest[1]] = dragSrcElement.textContent;
          mapOfAnswer[attributesOrigin[1]] = this.textContent;
          break;
        case attributesOrigin[0] === "question" &&
          attributesDest[0] === "option":
          mapOfAnswer[attributesOrigin[1]] = this.textContent;
          break;
      }

      dragSrcElement.innerHTML = this.innerHTML;
      this.innerHTML = newHtml;

      const taskCompleted = mapOfAnswer.filter((item) => item !== "");
      if (taskCompleted.length > 3) {
        document.getElementById("options").style.display = "none";
        refresh.style.display = "block";
        submitActive();
      }
    }
    return false;
  };

  items.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("drop", handleDrop);
  });

  refresh.onclick = function () {
    resetAnswer();
    refresh.style.display = "none";
    resetOption();
    submitInactive();
  };

  const submitActive = function () {
    const submit = document.getElementById("submit");
    submit.removeAttribute("disabled");
    submit.classList.add("submit-active");
    submit.classList.remove("submit-inactive");
  };

  const submitInactive = function () {
    const submit = document.getElementById("submit");
    submit.setAttribute("disabled", "");
    submit.classList.add("submit-inactive");
    submit.classList.remove("submit-active");
  };

  const resetAnswer = function () {
    for (let i = 0; i < mapOfAnswer.length; i++) {
      document.getElementById(`question-${i}`).innerHTML = "";
      document.getElementById(`question-${i}`).classList.add("question");
      document.getElementById(`question-${i}`).classList.remove("option");
    }
  };

  const resetOption = function () {
    document.getElementById("options").style.display = "flex";
    for (let i = 0; i < mapOfAnswer.length; i++) {
      document.getElementById(`option-${i}`).innerHTML = mapOfAnswer[i];
      document.getElementById(`option-${i}`).classList.add("option");
      document.getElementById(`option-${i}`).classList.remove("question");
    }
    mapOfAnswer = [];
  };

  const submit = document.getElementById("submit");
  submit.onclick = function () {
    const correct = chekAnswer();
    document.getElementById("box-questions").remove();
    document.getElementById("action-section").remove();
    const boxFinish = document.getElementById("box-finish");
    boxFinish.style.display = "block";
    correct
      ? (boxFinish.innerHTML = "Correct :)")
      : (boxFinish.innerHTML = "Wrong :(");
  };

  const answerKey = [".reduce", "currentValue", "accumulator", "initializer"];
  const chekAnswer = function () {
    return mapOfAnswer.every((item, index) => item === answerKey[index]);
  };
});
