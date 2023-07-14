let balance = document.querySelector(".balance");
let modal = document.querySelector(".modal");

let active = true;
let chosen = [];

let bet = 500;

document.querySelector(".balance").innerHTML = localStorage.balance_g202;

for (let i = 0; i < 28; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell", "block");
  cell.innerHTML = cell.dataset.num = i + 1;

  cell.onclick = () => {
    if (!active) {
      return;
    }

    if (!chosen.includes(cell.innerHTML)) {
      if (chosen.length != 10) {
        cell.classList.add("chosen");
        chosen.push(cell.innerHTML);
      }
    } else {
      cell.classList.remove("chosen");
      chosen.splice(chosen.indexOf(cell.innerHTML), 1);
    }

    activateIndicators();
  };

  document.querySelector(".field").appendChild(cell);
}

for (let i = 0; i < 10; i++) {
  const indicator = $("<div>");
  indicator.addClass("indicator");

  $(".indicators").append(indicator);
}

document.querySelector(".spin").onclick = () => {
  if (!active || !chosen.length) {
    return;
  }
  active = false;

  changeBalance(-bet);

  setTimeout(() => {
    let winList = shuffle(Array.from({ length: 28 }, (v, i) => i + 1)).slice(
      0,
      chosen.length
    );
    let circleNum = 0;

    $(".outs_title").html(chosen.length);

    let outInterval = setInterval(() => {
      const out = document.createElement("ball");
      out.classList.add("out", "block");
      out.innerHTML = winList[circleNum];

      if (chosen.includes(winList[circleNum])) {
        out.classList.add("act");
      }

      document.querySelector(".outs_cont2").appendChild(out);
      circleNum++;

      if (circleNum == chosen.length) {
        clearInterval(outInterval);
      }
    }, 500);

    setTimeout(() => {
      let win = 0;
      const common = countCommon(winList, chosen);

      if (common > 0) {
        win = 1;
      } else if (common > 2) {
        win = 3;
      }

      $(".result").html(bet * win);
      changeBalance(bet * win);

      modal.style.left = "50%";
    }, chosen.length * 500 + 1500);
  }, 500);
};

$(".shuffle").click(function () {
  chosen = shuffle(Array.from({ length: 28 }, (v, k) => k + 1)).slice(0, 10);

  $(".cell").removeClass("chosen");

  chosen.forEach((num) => {
    $(".cell")
      .eq(num - 1)
      .addClass("chosen");
  });

  activateIndicators();
});

document.querySelector(".modal").onclick = () => {
  modal.style.left = "-50%";

  for (let ball of document.querySelectorAll(".ball")) {
    ball.style.left = 0;
    setTimeout(() => {
      ball.remove();
    }, 600);
  }

  clearField();

  $(".outs_title").html(10);
  $(".outs_cont2").html("");
  activateIndicators();

  setTimeout(() => {
    active = true;
  }, 600);
};

function clearField() {
  for (let cell of document.querySelectorAll(".cell")) {
    cell.classList.remove("chosen", "bot_chosen");
  }

  chosen = [];
}

function countCommon(arr1, arr2) {
  let res = 0;
  for (let elem of arr1) {
    if (arr2.includes(elem)) {
      res += 1;
    }
  }

  return res;
}

function activateIndicators() {
  $(".indicator").removeClass("act");

  for (let i = 0; i < chosen.length; i++) {
    $(".indicator").eq(i).addClass("act");
  }
}
