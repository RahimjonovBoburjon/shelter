const request = new XMLHttpRequest();
request.open("GET", "../../assets/pets.json");

let header = document.querySelector("#header");
let buttonBurger = document.querySelector("#header__button-burger");
let headerMobile = document.querySelector("#header-mobile");
let modal = document.querySelector("#modal__learn-more");
let namePets = document.querySelector(".modal__content-name");
let scrImgPets = document.querySelector(".modal__content-img");
let breadPets = document.querySelector(".modal__content-pet-breed");
let descriptionPets = document.querySelector(".modal__content-pet-description");
let agePets = document.querySelector(".modal__content-pet-criteria")
  .childNodes[1];
let inoculationsPets = document.querySelector(".modal__content-pet-criteria")
  .childNodes[3];
let criteriaPets = document.querySelector(".modal__content-pet-criteria")
  .childNodes[5];

let parasitesPets = document.querySelector(".modal__content-pet-criteria")
  .childNodes[7];

buttonBurger.addEventListener("click", () => {
  buttonBurger.classList.toggle("header__button-burger_open");
  header.classList.toggle("header_hidden");
  headerMobile.classList.toggle("header-mobile_active");
  document.body.classList.toggle("hidden");
  document.body.addEventListener("click", (e) => {
    if (
      e.target.classList[1] === "header-mobile_active" ||
      e.target.classList[2] === "header__nav-link_active"
    ) {
      document.body.classList.remove("hidden");
      header.classList.remove("header_hidden");
      headerMobile.classList.remove("header-mobile_active");
      buttonBurger.classList.remove("header__button-burger_open");
    }
  });
});

let pets = [];
let fullPetsList = [];

fetch("../../assets/pets.json")
  .then((res) => res.json())
  .then((list) => {
    pets = list;

    const petsId = {
      Jennifer: pets[0],
      Sophia: pets[1],
      Woody: pets[2],
      Scarlett: pets[3],
      Katrine: pets[4],
      Timmy: pets[5],
      Freddie: pets[6],
      Charly: pets[7],
    };

    document.addEventListener("click", (e) => {
      if (e.target.closest(".card-pets") !== null) {
        generateModal(e.target.closest(".card-pets").id);
        modal.classList.toggle("modal__learn-more_open");
        document.body.classList.toggle("hidden");
      } else {
        if (
          e.target.classList[1] === "modal__learn-more_open" ||
          e.target.classList[0] === "modal__button-close"
        ) {
          modal.classList.remove("modal__learn-more_open");
          document.body.classList.remove("hidden");
        }
      }
    });

    generateModal = (id) => {
      namePets.innerHTML = petsId[id].name;
      scrImgPets.src = petsId[id].img;
      breadPets.innerHTML = petsId[id].type + " - " + petsId[id].breed;
      descriptionPets.innerHTML = petsId[id].description;
      agePets.innerHTML = `<span>Age:</span> ${petsId[id].age}`;
      inoculationsPets.innerHTML = `<span>Inoculations:</span> ${petsId[id].inoculations}`;
      criteriaPets.innerHTML = `<span>Diseases:</span> ${petsId[id].diseases}`;
      parasitesPets.innerHTML = `<span>Parasites:</span> ${petsId[id].parasites}`;
    };

    fullPetsList = (() => {
      let tempArr = [];

      for (let i = 0; i < 6; i++) {
        const newPets = pets;

        for (let j = pets.length; j > 0; j--) {
          let randInd = Math.floor(Math.random() * j);
          const randElem = newPets.splice(randInd, 1)[0];
          newPets.push(randElem);
        }

        tempArr = [...tempArr, ...newPets];
      }
      return tempArr;
    })();

    fullPetsList = sort863(fullPetsList);

    createPets(fullPetsList);
    $(".our-friends__slider").slick({
      prevArrow: $(".prev"),
      nextArrow: $(".next"),
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,

      responsive: [
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        },

        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    });
  });

const createPets = (petsList) => {
  const elem = document.querySelector(".our-friends__slider");
  elem.innerHTML += createElements(petsList);
};

createElements = (petsList) => {
  let str = "";
  for (let i = 0; i < petsList.length; i++) {
    str += `<div class="our-friends__slider-card">
              <div id="${petsList[i].name}" class="card-pets">
                <figure class="card-pets__photo">
                  <img src="${petsList[i].img}" alt="card" />
                </figure>
                <p class="card-pets__name">${petsList[i].name}</p>
                <button class="btn btn_border">Learn more</button>
              </div>
            </div>
    `;
  }
  return str;
};

request.send();

const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;

  list = sort6recursively(list);

  return list;
};

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < length / 6; i++) {
    const stepList = list.slice(i * 6, i * 6 + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && ind !== j;
      });

      if (duplicatedItem !== undefined) {
        const ind = i * 6 + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
};
