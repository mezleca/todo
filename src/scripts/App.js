/* @TODO:
    - metodo para reorganizar as tasks no html de acordo com a posicao da array sem reload ( ex: quando o id 4 de uma array de 12 posicoes for excluido )
*/

class App {
    constructor(name) {
        this.box_name = name;
        this.tasks = [{}];
        this.removed_tasks = [{}];
        this.creating = false;
    }

    initialize = () => {
        const storage = localStorage.getItem("tasks");
        if (!storage) {
            localStorage.setItem("tasks", "[{}]");
        }

        const deleted = localStorage.getItem("deleted");
        if (!deleted) {
            localStorage.setItem("deleted", "[{}]");
        }
        
        if (deleted)
            this.removed_tasks = JSON.parse(deleted);

        this.tasks = JSON.parse(storage);
        
        document.querySelector("#status").innerHTML = `${this.tasks.length - 1} task${this.tasks.length - 1 == 1 ? "" : "s"} remaining`; // lol

        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].name) {
                this.update_web(this.tasks[i].name);
            }
        }

        for (let i = 0; i < this.removed_tasks.length; i++) {
            if (this.removed_tasks[i].name) {
                this.update_web(this.removed_tasks[i].name, true);
            }
        }
    };
    
    add_item = (name) => {

        if (this.tasks.find((element) => element.name == name)) { 
            return alert("ja existe uma task com esse nome!");
        }

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const new_storage = [...tasks, {
            name: name
        }];

        this.tasks = new_storage;
        this.update();

        const div = document.querySelector(".tasks");

        const new_task = document.createElement("div");
        const new_title = document.createElement("h1");
        const elter_img = document.createElement("img");

        new_title.innerHTML = name;
        elter_img.src = "imgs/trash-can.png";

        new_title.setAttribute("id", `a${this.tasks.length - 1}`);
        new_title.addEventListener("click", this.remove_item);

        new_task.setAttribute("class", "task");
        new_task.appendChild(new_title);
        new_task.appendChild(elter_img);

        div.appendChild(new_task);

        document.querySelector("#status").innerHTML = `${this.tasks.length - 1} task${this.tasks.length - 1 == 1 ? "" : "s"} remaining`; // top
    };

    remove_item = (e) => {

        const text = e.target.parentElement.children[0].innerText;

        console.log(text);

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const new_storage = tasks.filter((a, i) => {
            return a.name != text;
        });

        this.removed_tasks.push({
            name: text
        });
        
        this.tasks = new_storage;
        this.update();

        // por enquanto vou ter que usar essa merda
        window.location.reload();
    };  

    list_all = () => {
        for (let i = 0; i < this.tasks.length; i++) {
            console.log(this.tasks[i].name);
        }
    };

    update = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks.length != this.tasks.length) {
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }

        const deleted_tasks = JSON.parse(localStorage.getItem("deleted"));
        if (deleted_tasks != undefined && deleted_tasks.length != this.removed_tasks.length) {
            console.log(deleted_tasks.length, this.removed_tasks.length, this.removed_tasks);
            localStorage.setItem("deleted", JSON.stringify(this.removed_tasks));
        }
    };

    update_web = (name, removed) => {
  
        const tasks = !removed ? document.querySelector(".tasks") : document.querySelector(".removed_tasks");

        const new_task = document.createElement("div");
        const new_title = document.createElement("h1");
        const bin_img = document.createElement("img");

        new_title.innerHTML = name;
        bin_img.src = "imgs/trash-can.png";

        if (!removed)
            bin_img.addEventListener("click", this.remove_item);
        
        new_task.setAttribute("class", "task");
        new_task.appendChild(new_title);
        new_task.appendChild(bin_img);

        tasks.appendChild(new_task);
    };

    clear_finished_tasks = () => {
        this.removed_tasks = [];
        this.update();

        // depois eu tiro isso
        window.location.reload();
    };
};

export const app = new App();