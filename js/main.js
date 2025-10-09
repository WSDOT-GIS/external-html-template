/// <reference types="jquery" />

// @ts-check

window.addEventListener("load", () => {
  for (const element of document.body.querySelectorAll(
    ".btn-close,.navbar-toggle,.overlay"
  )) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
      document.body.classList.toggle("toggled");
      document.body.querySelector(".main.navbar")?.classList.toggle("active");
    });
  }

  document.body
    .querySelector("#edit-submit")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();

      /**
       * @type {HTMLInputElement|null}
       */
      const editKeys = document.body.querySelector("#edit-keys");
      if (editKeys) {
        /**
         * @type {HTMLFormElement|null}
         */
        const form = document.body.querySelector(
          "#search-api-page-block-form-search"
        );
        form?.submit();
        return;
      }
    });
});
