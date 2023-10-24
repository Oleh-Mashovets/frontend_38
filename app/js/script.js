/* {}   [] */
"use strict";

const wrap = document.getElementById("character__list");

let url;
let idUser;
let selected;
let userName;

async function getCharacters(page) {
  selected = document.querySelector('input[name="filter"]:checked').value;
  userName = document.getElementById("user").value;
  url = `page=` + page;
  const nameCharacter =
    `https://rickandmortyapi.com/api/character?${url}&name=` +
    userName +
    "&status=" +
    selected;
  const responce2 = await fetch(nameCharacter);
  idUser = await responce2.json();
  //   console.log(idUser.results);

  addElement();
}

function addElement() {
  pageNum.innerHTML = current_page;

  while (wrap.children.length > 1) {
    wrap.removeChild(wrap.lastChild);
  }

  for (let user = 0; user < idUser.results.length; user++) {
    let newDiv = document.createElement(`div`);
    newDiv.classList.add("item__block");
    newDiv.innerHTML = `<div class="wrapper">
    <div class="wrapper__item">
    <p class="item__text">${idUser.results[user]?.id}</p>
    <p class="item__text">${idUser.results[user]?.name}</p>
    <p class="item__text">${idUser.results[user]?.status}</p>
    </div>
    <div class="wrapper__button">
    <button btn-name="delete" onClick="handleRecordAction(event)" id="btn">Delete</button>
    </div>
    </div>`;
    wrap.appendChild(newDiv);

    let infoPopUp;
    let imagePopUp;

    newDiv.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      popUp.classList.add("active");

      infoPopUp = document.querySelector(".pop-up__info");
      infoPopUp.innerHTML = `name:<br><br><b>${idUser.results[user]?.name}</b><br><br><br><br> 
      id: <b>${idUser.results[user]?.id}</b><br><br> 
      status: <b>${idUser.results[user]?.status}</b>`;

      imagePopUp = document.querySelector(".pop-up__image");
      let image = `<img class="img" src="${idUser.results[user].image}">`;
      imagePopUp.innerHTML = image;

      let el = document.querySelectorAll(".item__block");

      for (let user = 0; user < el.length; user++) {
        if (el[user].classList.contains("toggle__border")) {
          el[user].classList.remove("toggle__border");
        }
      }
      newDiv.classList.add("toggle__border");
    });

    let outsideSpace = document.getElementsByTagName("body");

    outsideSpace[0].addEventListener("click", () => {
      popUp.classList.remove("active");
    });
  }
}

const closePopUp = document.getElementById("close");
const popUp = document.querySelector(".pop-up");

closePopUp.addEventListener("click", (e) => {
  e.preventDefault();
  popUp.classList.remove("active");
});

const actionList = {
  delete: (element) => {
    element.remove();
  },
};

function handleRecordAction(event) {
  event.stopPropagation();
  const curentRecord = event.target;
  const action = event.target.getAttribute("btn-name");

  if (action in actionList) {
    actionList[action](curentRecord.parentElement.parentElement.parentElement);
  }
}

let radioBnt = document.querySelectorAll('input[name="filter"]');
let btnSearch = document.querySelector(".search");

let clear = document.getElementById("user");

let findSelected = () => {
  selected = document.querySelector('input[name="filter"]:checked').value;
};

radioBnt.forEach((radioItem) => {
  radioItem.addEventListener("change", findSelected);
});

function handlerSearch() {
  getCharacters(1);
}

const btnList = document.querySelector(".button__list");

let btnPrev = document.createElement(`button`);
btnPrev.classList.add("btn__prev");
btnPrev.innerText = `${String.fromCharCode(8249)} prev`;
btnList.appendChild(btnPrev);

let pageNum = document.createElement("p");
pageNum.classList.add("page");
pageNum.innerText = ``;
btnList.appendChild(pageNum);

let btnNext = document.createElement(`button`);
btnNext.classList.add("btn__next");
btnNext.innerText = `next ${String.fromCharCode(8250)}`;
btnList.appendChild(btnNext);

btnNext.addEventListener("click", () => {
  if (current_page < idUser.results.length) {
    getCharacters((current_page += 1));
    pageNum.innerHTML = current_page;
  }
});
btnPrev.addEventListener("click", () => {
  if (current_page > 1) {
    getCharacters((current_page -= 1));
    pageNum.innerHTML = current_page;
  }
});

let current_page = 1;

let prevPage = function () {
  current_page--;
};
let nextPage = function () {
  current_page++;
};