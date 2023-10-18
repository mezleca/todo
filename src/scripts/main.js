import { app } from "./db.js";

app.initialize("tasks");
app.update();

const new_task = document.querySelector("#new");

const handleClick = () => {
    if (app.creating) {
        return;
    }

    const div = document.querySelector(".new_task");
    div.innerHTML = 
    `
    <input type="text" placeholder="nome da task" id="piroca"/>
    `

    const input_element = document.querySelector("#piroca");
    const handleEventListener = (e) =>{
        const text = e.target.value;

        if (e.key == "Enter" && text != "") {
            app.add_item(text);

            input_element.removeEventListener("keydown", handleEventListener);
            new_task.removeEventListener("click", handleClick)
            div.innerHTML = `<button id="new">New Task</button>`;
            app.creating = false;

            document.querySelector("#new").addEventListener("click", handleClick);
        };
    };

    input_element.addEventListener("keydown", handleEventListener);
};

new_task.addEventListener("click", handleClick);