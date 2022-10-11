(() =>{
const btn = document.querySelector('[data-form-btn]');

const createTask = (evento) => {
  	evento.preventDefault();

  	const input = document.querySelector('[data-form-input]');
  	const value = input.value;
  	input.value ="";

  	const list = document.querySelector('[data-list]');
 	const task = document.createElement("li");
 	task.classList.add("card")


 	const taskContent = document.createElement("div");

 	const tittleTask = document.createElement("span");
 	tittleTask.classList.add("task");
	tittleTask.innerText = value;
 	taskContent.appendChild(checkComplete());
 	taskContent.appendChild(tittleTask);


    // task.innerHTML = content;
   	task.appendChild(taskContent);
   	task.appendChild(deleteIcon());
   	list.appendChild(task);
  	
};


//Arrow functions o funciones anonimas
btn.addEventListener('click', createTask);

const checkComplete = () => {
	const i = document.createElement('i');
	i.classList.add("far","fa-check-square","icon");
	i.addEventListener('click', completeTask);
    return i;
};

const completeTask = (event) => {
    const element = event.target;
    element.classList.toggle('fas');
    element.classList.toggle('completeIcon');
    element.classList.toggle('far');
  };

const deleteIcon = ()=>{

    const i = document.createElement('i');
    i.classList.add("fas","fa-trash-alt","trashIcon","icon");
    i.addEventListener("click",deleteTask);
    return i;
}

const deleteTask = (e)=>{
	const parent = e.target.parentElement;
	parent.remove();
};

})();