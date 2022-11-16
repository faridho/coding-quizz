# Coding Quizz

Coding quizzes are quizzes with questions in which participants map syntactic shards into incomplete syntax via drag and drop. The goal is to make the syntax work correctly.

## Demo
![](https://github.com/faridho/coding-quizz/blob/master/demo.gif?raw=true)

## Code

Select id elements that relate between elements to do drag and drop. it only works with the same id element.

```bash
let items = document.querySelectorAll(".box");
items.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("drop", handleDrop);
});
```

Create functions to listening draggable events. Set data from the origin for transfer to the destination when dropping the element.

```bash
const handleDragStart = function (e) {
    ...
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
};
```

Then we add listener event handler for the target container, we call event `.preventDefault()`, which enables it to receive drop events.

```bash
const handleDragOver = function (e) {
    e.preventDefault();
    return false;
 };
```

Then get data into the element destination.

```bash
const handleDrop = function (e) {
    e.stopPropagation();
    const newHtml = e.dataTransfer.getData("text/html");
    this.innerHTML = newHtml;
    ....
}
```

## License

MIT © [faridho](https://github.com/faridho)
