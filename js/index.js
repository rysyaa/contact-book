// ! ---------- TODO List ------
let form = document.querySelector("form");
let inpName = document.querySelector("#inpName");
let inpNumber = document.querySelector("#inpNumber");
let inpImg = document.querySelector("#inpImg");
let list = document.querySelector("ul");

// ? create
createTask()
function createTask() {
  if (!localStorage.getItem("Info")) {
    localStorage.setItem("Info", "[]");
  }

  let data = JSON.parse(localStorage.getItem("Info"));
  console
  .log(data);
  list.innerHTML = ''
  data.forEach((elem, index) => {
    list.innerHTML += `
    <li>
      Name: ${elem.name}
      </br>
      Number: ${elem.number}
      </br>
      Img: => <img id="photo" style="width: 200px; height: 150px" src="${elem.img}" alt="You didn't include a link to the photo">
      <button id="btnDel" onclick="deleteTask(${index})" >delete</button>
      <button onclick="editTask(${index})">edit</button>
    </li>
    `
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if(inpName.value.trim() === '' || inpNumber.value.trim() === '' || inpImg.value.trim() === ''){
    alert('Заполните поля')
    return;
  }

  let obj = {
     name: inpName.value,
     number: inpNumber.value,
     img: inpImg.value,
    };
  let data = JSON.parse(localStorage.getItem("Info"));
  data.push(obj);
  localStorage.setItem("Info", JSON.stringify(data));

  inpName.value = ''

  createTask();
});

// ? delete

function deleteTask(index){
    let data = JSON.parse(localStorage.getItem('Info'))
    data.splice(index, 1)
    localStorage.setItem('Info', JSON.stringify(data))
    createTask()
}

// ? edit

let modal = document.querySelector('.modal');
// let inpEdit = document.querySelector('.modal_body input');
let inpModalName = document.querySelector('#inpModalName');
let inpModalNumber = document.querySelector('#inpModalNumber');
let inpModalImg = document.querySelector('#inpModalImg');
let btnSave = document.querySelector('.modal_body button');
let closeModal = document.querySelector('.modal_footer button');

function editTask(index){
    modal.style.display = 'block'
    let data = JSON.parse(localStorage.getItem('Info'))
    inpModalName.value = data[index].name
    inpModalNumber.value = data[index].number
    inpModalImg.value = data[index].img
    inpModalName.setAttribute('id', index)
    inpModalNumber.setAttribute('id', index)
    inpModalImg.setAttribute('id', index)
}

closeModal.addEventListener('click', ()=>{
    modal.style.display = 'none'
});

btnSave.addEventListener('click', () => {
    let id = inpModalName.id
    let data = JSON.parse(localStorage.getItem('Info'))
    let newObj = {
        name: inpModalName.value,
        number: inpModalNumber.value,
        img: inpModalImg.value,
    };
    data.splice(id, 1, newObj)
    localStorage.setItem('Info', JSON.stringify(data))
    modal.style.display = 'none'
    console.log(id);
    createTask()
})
