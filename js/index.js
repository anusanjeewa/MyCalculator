
(function() {
  "use strict";  // Globally defined | run in strict mode

  // Shortcut to get elements
  var el = function (element) {
    if (element.charAt(0) === "#") {
      return document.querySelector(element);
    }
    return document.querySelectorAll(element);
  };

  // Variables
    var viewer = el("#viewer");
    var equals = el("#equals");
    var numbers = el(".number");
    var operator = el(".operator");
    var curNum = "";
    var oldNum = "";
    var resNum="";
    var opeVal = "";

    var setNum = function() {
    if (resNum) { // If a result was displayed, reset number
      curNum = this.getAttribute("data-number");
      resNum = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      curNum += this.getAttribute("data-number");
    }

    viewer.innerHTML = curNum; // Display current number
  };

  // Add click event to numbers
    for (var i = 0, l = numbers.length; i < l; i++) {
    numbers[i].onclick = setNum;
  }

  // To capture the second number, move the current value to the oldNum
  var moveNum = function() {
    oldNum = curNum;
    curNum = "";
    opeVal = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };


  // Click event for operators
  for (var i = 0, l = operator.length; i < l; i++) {
    operator[i].onclick = moveNum;
  }


  // Calculate and display when the equal pressed.
  var displayNum = function() {

    oldNum = parseFloat(oldNum);
    curNum = parseFloat(curNum);

    // Calculations
    switch (opeVal) {
      case "plus":
        resNum = oldNum + curNum;
        break;

      case "minus":
        resNum = oldNum - curNum;
        break;

      case "times":
        resNum = oldNum * curNum;
        break;

      case "divided by":
        resNum = oldNum / curNum;
        break;

      // If equal is pressed without an opeVal, keep number and continue
      default:
        resNum = curNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resNum)) {
      if (isNaN(resNum)) {
        resNum = "Invalid Operation!";
      } else {
        resNum = "Infinite number";
      }
    }

    // Display result, finally!
    viewer.innerHTML = resNum;
    equals.setAttribute("data-result", resNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    curNum = resNum;

  };

  // Add click event to equal sign
  equals.onclick = displayNum;

  // When: Clear button is pressed. Clear everything
  var clearAll = function() {
    oldNum = "";
    curNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resNum);
  };

  clear.onclick = clearAll;

}());
