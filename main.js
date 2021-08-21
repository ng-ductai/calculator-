"use strict";


var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// Thêm xử lí nhấp chuột vào nút số
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {

    // lưu trữ chuỗi đầu vào hiện tại và ký tự cuối cùng của nó trong các biến - được sử dụng sau này
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // Nếu kết quả không được hiển thị, chỉ cần tiếp tục thêm
    if (resultDisplayed === false) {
        input.innerHTML += e.target.innerHTML;
    } 
    else 
        if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        // Nếu kết quả hiện đang được hiển thị và người dùng nhấn một toán tử
        // Chúng ta cần tiếp tục thêm chuỗi cho thao tác tiếp theo
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } 
        else {
        // Nếu kết quả hiện đang được hiển thị và người dùng nhấn một số
        // Chúng ta cần xóa chuỗi đầu vào và thêm đầu vào mới để bắt đầu Opration mới
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }

  });
}

// Thêm xử lí nhấp chuột vào nút số
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {

    // lưu trữ chuỗi đầu vào hiện tại và ký tự cuối cùng của nó trong các biến - được sử dụng sau này
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // Nếu ký tự cuối cùng được nhập là operator, hãy thay thế nó bằng operator
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
    } 
    else 
        if (currentString.length == 0) {
        // Nếu phím đầu tiên được nhấn là opearator, đừng làm bất cứ điều gì
            console.log("enter a number first");
        } 
        else {
        // mặc khác chỉ cần thêm toán tử được nhấn vào đầu vào 
            input.innerHTML += e.target.innerHTML;
        }

  });
}

//  click 'equal' button
result.addEventListener("click", function() {

  // Đây là chuỗi mà chúng ta sẽ xử lý. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // Đầu tiên chúng ta thay thế tất cả các số và dấu chấm bằng chuỗi rỗng và sau đó split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // Bây giờ chúng ta đang lặp qua mảng và thực hiện một thao tác cùng một lúc.
   // Chia, nhân, trừ và sau đó cộng
   // Khi chúng ta di chuyển, chúng ta đang thay đổi các số ban đầu và mảng toán tử
   // Phần tử cuối cùng còn lại trong mảng sẽ là đầu ra

  var divide = operators.indexOf("÷");
  while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // Sử dụng parsefloat là cần thiết, nếu không nó sẽ dẫn đến sự kết hợp chuỗi 
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
  }

    input.innerHTML = numbers[0]; //hiển thị đầu ra

    resultDisplayed = true; // true nếu kết quả được hiển thị
});

// Xóa đầu vào khi bấm clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
})

