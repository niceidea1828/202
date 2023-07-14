if (!localStorage.getItem("balance_g202")) {
  localStorage.setItem("balance_g202", 10000);
}

$(".balance").html(localStorage.balance_g202);

