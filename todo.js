let tableautest =  JSON.parse(localStorage.getItem("todotabletest"))||[];

let bgtableinstoragetest = JSON.parse(localStorage.getItem("bgtabletest")) || [];
function onUpdate() {
  localStorage.setItem("todotabletest", JSON.stringify(tableautest));
  // document.location.reload()
  // tableautest = JSON.parse(localStorage.getItem("todotabletest"))
  afficher(tableautest)
  
}
onUpdate()
function bgUpdate() {
  localStorage.setItem("bgtabletest", JSON.stringify(bgtableinstoragetest));
  // bgtableinstoragetest = JSON.parse(localStorage.getItem("bgtabletest"))
  colours();
}
var all= document.getElementById('all');
var activiste=document.getElementById('activiste');
var completed=document.getElementById('completed');
var btntoogle= document.getElementById('toggle');
var icone= document.getElementById('torrr');
var count= document.getElementsByClassName('count');
console.log(count);

btntoogle.addEventListener('click',()=>{
   
  if(document.body.classList.contains('Dark')){

      bgtableinstoragetest[0]=0;
      localStorage.setItem("bgtable", JSON.stringify(bgtableinstoragetest));
  }else if(document.body.classList.contains('light')){
     
      bgtableinstoragetest[0]=1;
      localStorage.setItem("bgtable", JSON.stringify(bgtableinstoragetest));
  }
 bgUpdate()

})
function colours(){

  localStorage.setItem("bgtable", JSON.stringify(bgtableinstoragetest));

  console.log(bgtableinstoragetest);

  if (Number(bgtableinstoragetest[0])  === 0){
      
      document.body.classList.remove('Dark')
      document.body.classList.add('light');
      icone.innerHTML=`<img src="./images/icon-moon.svg" alt="hg">`
  }
else{
  document.body.classList.remove('light');
  document.body.classList.add('Dark');
  icone.innerHTML=`<img src="./images/icon-sun.svg" alt="hg"> `
}
}

colours();

var input = document.getElementById("texttodo");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    ajouter()
  }
});


function ajouter() {
    let a =document.getElementById("texttodo").value;
    
    
    if (a === "") {
      return  alert("veuillez saisir svp");
    }else{
      // alert('succes')
    }
      const todovaleur = {
        todocontain:a ,
        ischecked:false,
        id:new Date().getTime()
      };
   tableautest.unshift(todovaleur);
    console.log(tableautest);
      // todotableInStoragetest.unshift(todovaleur);
      onUpdate();
      document.getElementById("texttodo").value= ""
      
}
console.log(tableautest);


function afficher (tableau){

    const tbody = document.getElementById("divforAdd");
    tbody.innerHTML ="";
    tableau.forEach((element,index) => {
      tbody.innerHTML += `
      <div class=" p-2  add   d-flex justify-content-between align-items-center">
       <div>
      <button ${element.ischecked === false ? `class="bg-white d-flex justify-content-center align-items-center  boutoncircle  border border-secondary" onclick="checkage(${element.id})"`:`class=" bg-white d-flex justify-content-center align-items-center  boutoncircle checkedbg  border-0  border border-secondary"onclick="checkage(${element.id})"`}>
          <img src="./images/icon-check.svg" ${element.ischecked === false ? 'class=" opacity-0 icone-checked "':'class=" icone-checked"'} alt="nj">
      </button>
    </div>
    
    <div class="container_input w-75 ">
          <input ${element.ischecked === false ?`class=" form-control search "`:`class=" form-control searchchecked " `}   type="text" readonly value="${element.todocontain}"  aria-label="Search">
    </div>
    <div>
        <button class="btn" onclick="supprimer(${index})">
          <img src="./images/icon-cross.svg" class="  icone-checked" alt="nj">
       </button>
  </div>

  </div>
   `;
    });
  
  
  }
 

  function supprimer(id) {
    if(all.classList.contains('active')){
      tableautest.splice(id, 1);
      // afficher(tableautest)
      onUpdate();
      itemsleft()
    }else if(activiste.classList.contains('active')){
      tableautest.splice(id, 1);
      filterActive()
    }else{
      tableautest.splice(id, 1);
      filterComplete()
    }
   
  }
function checkage(arc){
    let state= tableautest.find(e => e.id === arc);
  console.log(state);
if(all.classList.contains('active')){
  if(state.ischecked === false){
    const index = tableautest.findIndex(el => el.id === arc);
  
    tableautest[index].ischecked = true;
  onUpdate()
  }else{
    const index = tableautest.findIndex(el => el.id === arc);
  
    tableautest[index].ischecked = false;
   onUpdate()
  }
  itemsleft()
}else{
  if(state.ischecked === false){
    const index = tableautest.findIndex(el => el.id === arc);
  
    tableautest[index].ischecked = true;
    localStorage.setItem("todotabletest", JSON.stringify(tableautest));
    filterActive()
  }else{
    const index = tableautest.findIndex(el => el.id === arc);
  
    tableautest[index].ischecked = false;
    localStorage.setItem("todotabletest", JSON.stringify(tableautest));
    filterComplete()
  }
}
  
}
  function filterActive() {
    all.classList.remove('active')
    completed.classList.remove('active')
    activiste.classList.add('active')
   let resultat= tableautest.filter((element) => element.ischecked === false);  
    afficher(resultat)  
    itemsleft()
  }
  function filterComplete() {
    all.classList.remove('active')
    activiste.classList.remove('active')
    completed.classList.add('active')
    let resultat= tableautest.filter( (element) => element.ischecked === true);  
     afficher(resultat)  
    itemsleft()
     
   }
  // Function clear completed
  function clearCompleted(){
   tableautest= tableautest.filter( (element) => element.ischecked === false);
    onUpdate()
    itemsleft()
  }

  function itemsleft() {
    let itemsleft=  tableautest.filter( (element) => element.ischecked === false);
    console.log(itemsleft.length);
    count[0].innerHTML= itemsleft.length;
    count[1].innerHTML= itemsleft.length;
  }

  itemsleft()