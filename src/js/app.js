(function() {
  "use strict";

  var App = (function() {
    var activeStep = 1;
    var steps = 4;
    var $prev = document.querySelector(".control#prev");
    var $next = document.querySelector(".control#next");

    // Setup click handlers for prev/next buttons
    $prev.addEventListener("click", function() {
      step('prev');
    });
    $next.addEventListener("click", function() {
      step('next');
    });

    // Handles displaying next/prev step and hiding/showing prev/next buttons
    function step(dir) {
      switch (dir) {
        case "next":
          activeStep++;
          break;
        case "prev":
          activeStep--;
          break;
      }

      // If the current step is 1, hide prev button; otherwise show it
      if (activeStep === 1) {
        deactivate($prev);
      } else {
        activate($prev);
      }

      // If the current step is set to the maximum number of steps (defined above),
      // hide next button; otherwise show it
      if (activeStep === steps) {
        deactivate($next);
      } else {
        activate($next);
      }

      toggleActive(document.querySelectorAll(".wizard .step.active"));
      toggleActive(document.querySelectorAll(".wizard .step" + activeStep));

      if (activeStep === 4) {
        confirmation();
      }

      // Toggle "active" class on a given NodeList
      function toggleActive(elements) {
        elements = elements.length ? elements : [elements];

        for (var i = 0; i < elements.length; i++) {
          if (elements[i].classList.contains("active")) {
            elements[i].classList.remove("active");
          } else {
            elements[i].classList.add("active");
          }
        }
      }
      // Add "active" class on a given NodeList
      function activate(elements) {
        elements = elements.length ? elements : [elements];

        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.add("active");
        }
      }

      // Remove "active" class on a given NodeList
      function deactivate(elements) {
        elements = elements.length ? elements : [elements];

        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove("active");
        }
      }
    }

    // Handles gathering of all input data and displaying it
    function confirmation() {
      // Find all inputs on each page
      var $inputsPersonal = document.querySelectorAll(".pages .step1 [data-label]");
      var $inputsReferences = document.querySelectorAll(".pages .step2 [data-label]");
      var $inputsMore = document.querySelectorAll(".pages .step3 [data-label]");

      // Find all columns on confirmation page
      var $columnPersonal = document.querySelector(".step4 .personal .data");
      var $columnReferences = document.querySelector(".step4 .references .data");
      var $columnMore = document.querySelector(".step4 .more .data");

      // Call appendData for each page
      appendData($inputsPersonal, $columnPersonal);
      appendData($inputsReferences, $columnReferences);
      appendData($inputsMore, $columnMore);

      // Handles creating HTML elements for each supplied input and
      // appending them to the supplied column
      function appendData(inputs, column) {
        var value;
        var label;

        // Reset confirmation data
        column.innerHTML = "";

        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].value) {
            value = document.createElement("p");
            label = document.createElement("span");

            label.innerHTML = inputs[i].dataset.label;
            value.innerHTML = inputs[i].value;

            value.appendChild(label);
            column.appendChild(value);
          }
        }
      }
    }
  }());
})();
