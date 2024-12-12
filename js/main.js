$(document).ready(function () {
    $(".header-text").css("opacity", "0").delay(500).animate({ opacity: "1" }, 1000);

    // ---- nav link activetion menege ------
    const sections = $("section"); // Replace with your section tags or IDs
    const navLinks = $("#navUl a");

    $(window).on("scroll", function () {
      let current = "";

      // Determine which section is in view
      sections.each(function () {
        const sectionTop = $(this).offset().top;
        const sectionHeight = $(this).outerHeight();
        if ($(window).scrollTop() >= sectionTop - sectionHeight / 3) {
          current = $(this).attr("id"); // Get section ID
        }
      });

      // Highlight the active link
      navLinks.each(function () {
        $(this).removeClass("active");
        if ($(this).attr("href").includes(current)) {
          $(this).addClass("active");
        }
      });
    });

    // ---- smooth scrolling  ------
    const $animatedElements = $("[data-animate]");
    $animatedElements.addClass("hidden");

    $(window).on("scroll", function () {
      $animatedElements.each(function () {
        const elementTop = $(this).offset().top;
        const viewportBottom = $(window).scrollTop() + $(window).height();

        if (viewportBottom > elementTop + $(this).outerHeight() * 0.2) {
          $(this).removeClass("hidden").addClass("visible");
        } else {
          $(this).removeClass("visible").addClass("hidden");
        }
      });
    });

    // Interactive card glassy effect
    $(".card").on("mousemove", function (e) {
      const $card = $(this);
      const $glassy = $card.find(".color-glassy");
      const offset = $card.offset();
      const x = e.pageX - offset.left;
      const y = e.pageY - offset.top;
      $glassy.css("transform", `translate(${x}px, ${y}px)`);
    });

    $(".card").on("mouseleave", function () {
      $(this).find(".color-glassy").css("transform", "translate(-50%, -50%)");
    });

    const navToggle = $("#navToggle");
    const navUl = $("#navUl");

    // Toggle navigation on icon click
    navToggle.on("click", function () {
      navUl.toggleClass("show");
    });

    // Hide navigation when a link is clicked
    navLinks.on("click", function () {
      navUl.removeClass("show");
    });
    const currentYear = new Date().getFullYear();
    $('#currentYear').text(currentYear);
  });
