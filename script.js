const formData = document.getElementById("form_data");
let wrapperSeguimento = document.querySelector(".wrapper-seguimento");
let returnMessage = document.querySelector(".return-message");
let displayTwo = document.querySelector(".wrapper-display-two");
let displayThree = document.querySelector(".wrapper-display-three");

const totalSeguimento = 7;
let valueRespose = null;
let newGame = false;
let backgroundColor = "";

const numberZero = [true, true, true, true, true, true, false];
const numberOne = [false, true, true, false, false, false, false];
const numberTwo = [true, true, false, true, true, false, true];
const numberThree = [true, true, true, true, false, false, true];
const numberFour = [false, true, true, false, false, true, true];
const numberFive = [true, false, true, true, false, true, true];
const numberSix = [true, false, true, true, true, true, true];
const numberSeven = [true, true, true, false, false, false, false];
const numberEight = [true, true, true, true, true, true, true];
const numberNine = [true, true, true, false, false, true, true];

formData.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueUser = document.getElementById("valueuser").value;

  if (valueRespose === null) {
    fetch("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300")
      .then((res) => res.json())
      .then((res) => {
        if (res.StatusCode) {
          newGame = true;
          return verifyMatchInput(res.StatusCode);
        }
        valueRespose = res.value;
        verifyMatchInput(res.value);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => console.log());
  } else {
    verifyMatchInput(valueRespose);
  }

  /* função que verifica se o palpite é igual ao numero sorteado */
  function verifyMatchInput(value) {
    console.table({ "meu palpite": valueUser, "Número sorteado": value });
    if (value === 500 || value === 400) {
      returnMessage.innerHTML = "ERRO";
      return handleNewGame();
    }
    if (parseInt(valueUser) === value) {
      returnMessage.innerHTML = "Você acertou!!!";
      backgroundColor = "green";
      handleNewGame();
    } else if (parseInt(valueUser) > value) {
      returnMessage.innerHTML = "É menor";
      backgroundColor = "#262A34";
    } else if (parseInt(valueUser) < value) {
      returnMessage.innerHTML = "É maior";
      backgroundColor = "#262A34";
    }
    handleValueUserInput();
  }

  /* função que para transformar o número digitado no input em um array de seguimento */
  function handleValueUserInput() {
    for (let index in valueUser) {
      const valueUserInput = valueUser[index];

      switch (valueUserInput) {
        case "0":
          check(numberZero, index);
          break;
        case "1":
          check(numberOne, index);
          break;
        case "2":
          check(numberTwo, index);
          break;
        case "3":
          check(numberThree, index);
          break;
        case "4":
          check(numberFour, index);
          break;
        case "5":
          check(numberFive, index);
          break;
        case "6":
          check(numberSix, index);
          break;
        case "7":
          check(numberSeven, index);
          break;
        case "8":
          check(numberEight, index);
          break;
        case "9":
          check(numberNine, index);
          break;
        default:
          console.log(`Sorry, we are out of ${valueUser}.`);
      }
    }
  }
});

/* função para inserir os displays necessários (um ou os três números) e a cor de cada seguimento */
function check(value, index) {
  if (index === "0") {
    displayTwo.classList.add("displayOff");
    displayThree.classList.add("displayOff");
  } else if (index === "1") {
    displayThree.classList.add("displayOff");
    displayTwo.classList.remove("displayOff");
  } else {
    displayTwo.classList.remove("displayOff");
    displayThree.classList.remove("displayOff");
  }
  for (let i = 0; i < totalSeguimento; i++) {
    if (value[i] === true) {
      document.querySelector(
        ".seguimento" + index + (i + 1)
      ).style.backgroundColor = backgroundColor;
    } else {
      document.querySelector(
        ".seguimento" + index + (i + 1)
      ).style.backgroundColor = "#ddd";
    }
  }
  // limpar input apos o click
  document.getElementById("valueuser").value = "";
}

/* função que abilita ou desabilita o input e o botão e mostra botão de nova partida */
const handleNewGame = () => {
  document.getElementById("form_data").classList.add("disabled");
  document.getElementById("button").disabled = true;
  document.getElementById("valueuser").disabled = true;
  document.querySelector(".refresh-disabled").style.display = "block";
};
