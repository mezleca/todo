/* 
   duracao total do projeto: 2H:30M
   Tempo para fazer a classe/html/css: 1H
   Tempo para arrumar os bugs: 1H:30M......................................
*/

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

        const deleted = localStorage.getItem("deleted_tasks");
        if (!deleted) {
            localStorage.setItem("deleted", "[{}]");
        }
        
        this.tasks = JSON.parse(storage);
        this.removed_tasks = JSON.parse(deleted);

        document.querySelector("#status").innerHTML = `${this.tasks.length - 1} task${this.tasks.length - 1 == 1 ? "" : "s"} remaining`;

        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].name) {
                this.update_web(this.tasks[i].name, i);
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
        elter_img.src = "imgs/elter.jpg";

        new_title.setAttribute("id", `a${this.tasks.length - 1}`);
        new_title.addEventListener("click", this.remove_item);

        new_task.setAttribute("class", "task");
        new_task.appendChild(elter_img);
        new_task.appendChild(new_title);

        div.appendChild(new_task);

        document.querySelector("#status").innerHTML = `${this.tasks.length - 1} task${this.tasks.length - 1 == 1 ? "" : "s"} remaining`; // top
    };

    remove_item = (e) => {

        console.log(e)

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const new_storage = tasks.filter((a, i) => {
            return a.name != e.target.innerText;
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
            console.log("atualizando localstorage...");
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }
    };

    update_web = (name, id) => {
  
        const tasks = document.querySelector(".tasks");

        const new_task = document.createElement("div");
        const new_title = document.createElement("h1");
        const elter_img = document.createElement("img");

        new_title.innerHTML = name;
        elter_img.src = "imgs/elter.jpg";

        new_title.setAttribute("id", `a${this.tasks.length - 1}`);
        new_title.addEventListener("click", this.remove_item);
        
        new_task.setAttribute("class", "task");
        new_task.appendChild(elter_img);
        new_task.appendChild(new_title);

        tasks.appendChild(new_task);
    };
};

export const app = new App();