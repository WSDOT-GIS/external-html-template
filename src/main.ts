function setupStuff(this: Document): void {
  for (const element of document.body.querySelectorAll(
    ".btn-close,.navbar-toggle,.overlay"
  )) {
    function handleClick(e: Event): void {
      e.stopPropagation();
      document.body.classList.toggle("toggled");
      document.querySelector(".main.navbar")?.classList.toggle("active");
    }
    element.addEventListener("click", handleClick);
  }

  document.body
    .querySelector("#edit-submit")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
      const editKeys = document.querySelector<HTMLInputElement>("#edit-keys");
      if (editKeys?.value?.length) {
        document
          .querySelector<HTMLFormElement>("#search-api-page-block-form-search")
          ?.submit();
        return;
      }
    });
}

function resizeStuff(width: number) {
  const breakMdCtrl =
    document.querySelector<HTMLInputElement>(".break-md-control");
  const breakLgCtrl =
    document.querySelector<HTMLInputElement>(".break-lg-control");
  if (breakMdCtrl && breakLgCtrl) {
    if (width >= 992) {
      breakMdCtrl.setAttribute("aria-hidden", "true");
      breakLgCtrl.setAttribute("aria-hidden", "false");
      breakMdCtrl.style.display = "none";
      breakLgCtrl.style.display = "block";
    }
    if (width < 992) {
      breakMdCtrl.setAttribute("aria-hidden", "false");
      breakLgCtrl.setAttribute("aria-hidden", "true");
      breakMdCtrl.style.display = "block";
      breakLgCtrl.style.display = "none";
    }
  }
}

document.addEventListener("load", setupStuff);

window.addEventListener("resize", function (this: Window, _ev: UIEvent) {
  const width = this.innerWidth;
  resizeStuff(width);
});

// @ts-expect-error
if (behaviors.filter_toggle) {
  resizeStuff(window.innerWidth);
}

// Moved from inline HTML.
/*
$(document).ready(function () {
  $("#main-menu").sidr({
    name: "sidr-existing-content",
    source: "#menu-schmenu",
    side: "right",
  });
});
$(document.body).click(function (e) {
  // If a sidr is open.
  if ($.sidr("status").opened) {
    var isBlur = true;
    // If the event is not coming from within the sidr.
    if ($(e.target).closest(".sidr").length !== 0) {
      isBlur = false;
    }
    // If the event is not coming from within a trigger.
    if ($(e.target).closest(".js-sidr-trigger").length !== 0) {
      isBlur = false;
    }
    // Close sidr is unfocused.
    if (isBlur) {
      $.sidr("close", $.sidr("status").opened);
    }
  }
});
*/