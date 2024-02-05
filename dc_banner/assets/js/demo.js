const profilLogo = document.querySelectorAll(".profil-logo");
const input = document.querySelectorAll(".message input");
const modal = document.querySelector(".modal-container");
const helpBtn = document.querySelector(".help-btn");
const feedbackInput = document.querySelector("#feedback-input");

const toggleModal = () => {
  modal.classList.toggle("active");
};

profilLogo.forEach((logo) => {
  logo.addEventListener("click", toggleModal);
});

input.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      input.value = "";
      input.blur();
      toggleModal();
    }
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    toggleModal();
  }
});

helpBtn.addEventListener("click", () => {
  toggleModal();
});

feedbackInput.addEventListener("keyup", (e) => {
  const feedbackState = document.querySelector(".feedback-state");
  if (e.key === "Enter") {
    feedbackInput.blur();
    // Api wiil be add soon for a complete feedback system for me ( more big project will be add soon on my github, that's why would be nice to have a feedback system ) :)
    feedbackState.classList.add("error");
    feedbackState.innerText = "Api is not available for the moment, try later.";
  }
});

removeRole();
