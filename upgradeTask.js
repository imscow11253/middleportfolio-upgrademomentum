// <⚠️ DONT DELETE THIS ⚠️>
// <⚠️ /DONT DELETE THIS ⚠️>
const pendingSection = document.querySelector(".js-pendingList");
const finishedSection = document.querySelector(".js-finishedList");
const form = document.querySelector(".js-form");
const input = form.querySelector("input");

const KEY_OF_PENDING = "PENDING";
const KEY_OF_FINISHED = "FINISHED";

let pending = [];
let finished = [];

function savePending(){
  localStorage.setItem(KEY_OF_PENDING, JSON.stringify(pending));
}

function saveFinished(){
  localStorage.setItem(KEY_OF_FINISHED, JSON.stringify(finished));
}

function handleFinishedDelete(event){
	const target = event.target;
	const ul = target.parentNode;
	finishedSection.removeChild(ul);
  const cleanFinished = finished.filter(function(element){
    return element.id !== parseInt(ul.id);
  });
  finished = cleanFinished;
  saveFinished();
}

function handlePendingDelete(event){
	const target = event.target;
	const ul = target.parentNode;
	pendingSection.removeChild(ul);
  const cleanPending = pending.filter(function(element){
    return element.id !== parseInt(ul.id);
  });
  pending = cleanPending;
  savePending();
}

function handleBack(event){
  const target = event.target;
  const ul = target.parentNode;
  const span = ul.querySelector("span");
  finishedSection.removeChild(ul);
  const cleanFinished = finished.filter(function(element){
    return element.id !== parseInt(ul.id);
  });
  finished = cleanFinished;
  saveFinished();
  paintPending(span.innerText);
}

function handleCheck(event){
  const target = event.target;
  const ul = target.parentNode;
  const span = ul.querySelector("span");
  pendingSection.removeChild(ul);
  const cleanPending = pending.filter(function(element){
    return element.id !== parseInt(ul.id);
  });
  pending = cleanPending;
  savePending();
  paintFinished(span.innerText);
}

function paintFinished(text){
	const ul = document.createElement("ul");
	const delbtn = document.createElement("button");
	const backbtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = finished.length +1;
	ul.id = newId;
	delbtn.innerHTML = "❌";
	backbtn.innerHTML="⏪";
  delbtn.addEventListener("click", handleFinishedDelete);
	backbtn.addEventListener("click", handleBack);
	span.innerText = text;
	ul.appendChild(span);
	ul.appendChild(delbtn);
	ul.appendChild(backbtn);
	finishedSection.appendChild(ul);
	const finishedObj ={
		text: text,
		id : newId
	};
	finished.push(finishedObj);
	saveFinished();
}

function paintPending(text){
	const ul = document.createElement("ul");
	const delbtn = document.createElement("button");
	const checkbtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = pending.length +1;
	ul.id = newId;
	delbtn.innerHTML = "❌";
	checkbtn.innerHTML="✔";
	delbtn.addEventListener("click", handlePendingDelete);
  checkbtn.addEventListener("click", handleCheck);
	span.innerText = text;
	ul.appendChild(span);
	ul.appendChild(delbtn);
	ul.appendChild(checkbtn);
	pendingSection.appendChild(ul);
	const pendingObj ={
		text: text,
		id: newId
	};
	pending.push(pendingObj);
	savePending();
}

function loadData(){
	const loadPending = localStorage.getItem(KEY_OF_PENDING);
	const loadFinished = localStorage.getItem(KEY_OF_FINISHED);

	if (loadPending !== null){
		const parsedPending = JSON.parse(loadPending);
		parsedPending.forEach(function(pending){
			paintPending(pending.text)
		})
	}
	if (loadFinished !== null){
		const parsedFinished = JSON.parse(loadFinished);
		parsedFinished.forEach(function(finished){
			paintFinished(finished.text)
		})
	}
}

function handleSubmit(event){
	event.preventDefault();
    const currentValue = input.value;
    paintPending(currentValue);
    input.value="";
}

function init(){
	loadData();
	form.addEventListener("submit", handleSubmit);
}

init();