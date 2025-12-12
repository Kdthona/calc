//adding all functions for the basic math
const add = (num1,num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1,num2) => num2 != 0 ? num1 / num2 : 0;

function doMath(opp1, oper, opp2){
	const num1 = parseFloat(opp1);
	const num2 = parseFloat(opp2);
	switch(oper){
	case '+':
		return add(num1,num2);
		break;
	case '-':
		return subtract(num1,num2);
		break;
	case 'x':
		return multiply(num1,num2);
		break;
	case '/':
		return divide(num1,num2);
		break;
	default:
		return "error in doMath";
	}
}


//initializing button classes with javascript
const decimal = "0123456789";
const initBtns = document.querySelectorAll("button");
initBtns.forEach(button => {
  if(decimal.includes(button.textContent)){
	button.classList.add("number");
  }else button.classList.add("extra");
});

//initializing display objects to be used as operands/operator
op1Minor = document.querySelector("#operand");
op2Main = document.querySelector("#main");
operator = document.querySelector("#operator");

let operLoadedFlag = false;//to know when we can process =
let pointFlag = false;//to know when decimal point has been used

const btns = document.querySelector(".buttons");
btns.addEventListener('click', function(e){
if(e.target.classList.contains("number") || e.target.classList.contains("extra")){
  if(e.target.className == "number"){
	op2Main.textContent += e.target.textContent;
  }else{
	switch(e.target.textContent){
	  case '=':
		if(operLoadedFlag){
			op1Minor.textContent = doMath(op1Minor.textContent, operator.textContent, op2Main.textContent);
			op2Main.textContent = '';
			operator.textContent = '';
			pointFlag = false;
			operLoadedFlag = false;
		}
		break;
	  case '.':
		if(!pointFlag){
			op2Main.textContent += '.';
			pointFlag = true;
		}
		break;
	  default:
		if(operLoadedFlag){
			op1Minor.textContent = doMath(op1Minor.textContent, operator.textContent, op2Main.textContent);
			op2Main.textContent = '';
			operator.textContent = e.target.textContent;
			pointFlag = false;
		}else{
			if(op2Main.textContent != ''){
			op1Minor.textContent = op2Main.textContent;
			}
			op2Main.textContent = '';
			operator.textContent = e.target.textContent;
		}
		operLoadedFlag = true;
	}
  }
 }
});
