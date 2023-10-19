import { app } from "./App.js";

app.initialize("tasks");
app.update();

const new_task = document.querySelector("#new");
const clear = document.querySelector(".clear");

const active = document.getElementById("active");
const finished = document.getElementById("finished");

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

active.addEventListener("click", () => {
    if (!active.classList.contains("selected")) {
        document.querySelector(".finished_tab").style = "display: none";
        document.querySelector(".active_tab").style = "display: flex";
        active.classList.add("selected");
        finished.classList.remove("selected");
    }
});

finished.addEventListener("click", () => {
    if (!finished.classList.contains("selected")) {
        document.querySelector(".finished_tab").style = "display: flex";
        document.querySelector(".active_tab").style = "display: none";
        active.classList.remove("selected");
        finished.classList.add("selected");
    }
});

clear.addEventListener("click", () => {
    app.clear_finished_tasks();
})