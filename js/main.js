let ul = document.querySelector("#ul1");
let addBtn = document.querySelector("#add");
let inp = document.querySelector("input");
let allClear = document.querySelector("#allClear");
let popUp = document.querySelector("#popup");
let btnP = document.querySelectorAll("#popup>button");
let p = document.querySelector("#p");
let popUp2 = document.querySelector("#popup2");
let p2 = document.querySelector("#p2");
let btnP2 = document.querySelectorAll("#popup2>button");
let Edit = document.querySelector("#edit");
let myEdit;
let myLi;
let ulChecked = document.querySelector("#ulCh");
let allClear2 = document.querySelector("#allClear2");
let btnP3 = document.querySelectorAll("#popup3>button");
let popUp3 = document.querySelector("#popup3");
let li;
let liCh;
let todos = [];
if (localStorage.getItem("todos") == null) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem("todos"));

  todos.map((val) => {
    li = document.createElement("li");
    li.innerHTML = `
    <span class="grow-[16] lg:grow-[30]  ">${val}</span>
        <button onclick="trash(this)" class="grow-[1] hover:text-gray-300 duration-500"><i class="icon-trash-empty"></i></button>
        <button onclick="pencil(this)" class="grow-[1] hover:text-gray-300 duration-500"><i class="icon-pencil"></i></button>
        <input class="grow-[1] cursor-pointer hover:text-gray-300 duration-500" type="checkbox" onclick="checkedd(this)" name="" id="">
    `;
    li.classList.add("lis");
    ul.appendChild(li);
  });
}

let dones = [];
if (localStorage.getItem("dones") == null) {
  dones = [];
  
} else {
  dones = JSON.parse(localStorage.getItem("dones"));
  dones.map((val) => {
    liCh = document.createElement("li");
    liCh.innerHTML = `
    <span class="grow-[16] lg:grow-[30]  "><del>${val}</del></span>
        <button onclick="trash(this)" class="grow-[1]"><i class="icon-trash-empty"></i></button>
        <input onclick="undo(this)" type="checkbox" checked class="grow-[1] cursor-pointer hover:text-gray-300 duration-500" >
    `;
    liCh.classList.add("lich");
    ulChecked.appendChild(liCh);
  });
}

allClear2.addEventListener("click", () => {
  popUp3.parentElement.classList.add("translate");

  for (let i = 0; i <= ulChecked.children.length + 100; i++) {
    ulChecked.children[i].classList.add("linear");
  }
});

btnP3[0].addEventListener("click", () => {
    dones = []
  localStorage.setItem('dones',JSON.stringify(dones))
  popUp3.parentElement.classList.remove("translate");
  for (let i = 0; i <= ulChecked.children.length + 100; i++) {
    ulChecked.children[0].remove();
  }
});

btnP3[1].addEventListener("click", () => {
  p3.classList.remove("translate");
  for (let i = 0; i <= ulChecked.children.length + 100; i++) {
    ulChecked.children[i].classList.remove("linear");
  }
});

const checkedd = (s) => {
  let liCh = document.createElement("li");
  liCh.innerHTML = `
    <span class="grow-[16] lg:grow-[30]  "><del>${s.parentElement.children[0].innerText}</del></span>
        <button onclick="trash(this)" class="grow-[1]"><i class="icon-trash-empty"></i></button>
        <input onclick="undo(this)" type="checkbox" checked class="grow-[1] cursor-pointer hover:text-gray-300 duration-500" >
    `;
  todos.map((val, i) => {
    if (val == s.parentElement.children[0].innerHTML) {

      todos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
  dones.push(s.parentElement.children[0].innerHTML);
  localStorage.setItem("dones", JSON.stringify(dones));


  liCh.classList.add("lich");
  ulChecked.appendChild(liCh);
  s.parentElement.remove();
};

const undo = (s) => {
  let li = document.createElement("li");
    dones.map((val,i)=>{
        if (val ==s.parentElement.children[0].innerText ) {
            dones.splice(i,1)
            localStorage.setItem('dones',JSON.stringify(dones))
        }
    })
  li.innerHTML = `
    <span class="grow-[16] lg:grow-[30]  ">${s.parentElement.children[0].innerText}</span>
        <button onclick="trash(this)" class="grow-[1] hover:text-gray-300 duration-500"><i class="icon-trash-empty"></i></button>
        <button onclick="pencil(this)" class="grow-[1] hover:text-gray-300 duration-500"><i class="icon-pencil"></i></button>
        <input class="grow-[1] cursor-pointer hover:text-gray-300 duration-500" type="checkbox" onclick="checkedd(this)" name="" id="">
    `;
  li.classList.add("lis");
  ul.appendChild(li);
  todos.push(s.parentElement.children[0].innerText)
  localStorage.setItem('todos',JSON.stringify(todos))

    
  s.parentElement.remove();
};

const trash = (s) => {
  popUp.parentElement.classList.add("translate");
  s.parentElement.classList.add("linear");
  myLi = s.parentElement;
  
};


btnP[0].addEventListener("click", (e) => {
    let flagDones = false
    todos.map((val, i) => {
        if (val == myLi.children[0].innerHTML) {
    
          todos.splice(i, 1);
          localStorage.setItem("todos", JSON.stringify(todos));
        flagDones = true
        }
     });
    if (flagDones == false) {
        dones.map((val,i)=>{
            if (val==myLi.children[0].children[0].innerHTML) {
              
                dones.splice(i,1)
                localStorage.setItem('dones',JSON.stringify(dones))
               
            }
        })

    }
  myLi.remove();
  myLi.classList.remove("linear");
  popUp.parentElement.classList.remove("translate");
});

btnP[1].addEventListener("click", () => {
  myLi.classList.remove("linear");
  popUp.parentElement.classList.remove("translate");
});
let flagEdit
const pencil = (s) => {
  flagEdit = true
  inp.value = s.parentElement.innerText;
  inp.focus();
  myEdit = s.parentElement;
  Edit.style.display = "flex";
  addBtn.style.display = "none";
};

Edit.addEventListener("click", () => {
  
  if (inp.value == "") {
    inp.style.border = "1px solid red";
    setTimeout(() => {
      inp.style.border = "1px solid transparent";
    }, 1000);
  } else {
    flagEdit = false
    inp.style.border = "1px solid green";
    setTimeout(() => {
      inp.style.border = "1px solid transparent";
    }, 1000);
    todos.map((val,i)=>{
        if (val == myEdit.children[0].innerHTML) {
            todos.splice(i,1,inp.value)
            localStorage.setItem('todos',JSON.stringify(todos))
        }
      })
    myEdit.children[0].innerHTML = inp.value;
    Edit.style.display = "none";
    addBtn.style.display = "flex";
    inp.value = "";
    inp.focus();
  }
});

allClear.addEventListener("click", () => {
  popUp2.parentElement.classList.add("translate");

  for (let i = 0; i <= ul.children.length + 100; i++) {
    ul.children[i].classList.add("linear");
  }
});




btnP2[0].addEventListener("click", (e) => {
  todos = []
  localStorage.setItem('todos',JSON.stringify(todos))
  popUp2.parentElement.classList.remove("translate");
  for (let i = 0; i <= ul.children.length + 100; i++) {
    ul.children[0].remove();
  }
});

btnP2[1].addEventListener("click", () => {
  p2.classList.remove("translate");
  for (let i = 0; i <= ul.children.length + 100; i++) {
    ul.children[i].classList.remove("linear");
  }
});



addBtn.addEventListener("click", () => {
  if (inp.value == "") {
    inp.style.border = "1px solid red";
    setTimeout(() => {
      inp.style.border = "1px solid transparent";
    }, 2000);
    inp.focus();
  } else {
    inp.style.border = "1px solid green";
    setTimeout(() => {
      inp.style.border = "1px solid transparent";
    }, 2000);
    let li = document.createElement("li");

    li.innerHTML = `
    <span class="grow-[16] lg:grow-[30]  ">${inp.value}</span>
        <button onclick="trash(this)" class="grow-[1] hover:text-gray-300 duration-500"><i class="icon-trash-empty"></i></button>
        <button onclick="pencil(this)" class="grow-[1] hover:text-gray-300 duration-500"><i class="icon-pencil"></i></button>
        <input class="grow-[1] cursor-pointer hover:text-gray-300 duration-500" type="checkbox" onclick="checkedd(this)" name="" id="">
    `;

    todos.push(inp.value);
    localStorage.setItem("todos", JSON.stringify(todos));
 
    li.classList.add("lis");
    ul.appendChild(li);
    inp.value = "";
    inp.focus();
  }
});


inp.addEventListener('keyup',(e)=>{
    if ((e.which || e.keyCode) == 13) {
        if (flagEdit==true) {
            Edit.click()
        }else{
            addBtn.click()
        }
        
    }
})
