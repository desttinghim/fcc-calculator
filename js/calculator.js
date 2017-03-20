var queue = [];
var calcScreen = null;
buffer = "";

function registerCalc(calcEl) {
  calcScreen = calcEl.getElementsByClassName("screen")[0];
}

function drawScreen() {
  calcScreen.innerHTML = queue.join(" ") + " " + buffer;
}

function input(sym) {
  if (sym == "+" || sym == "-" || sym == "*" || sym == "/" || sym == " ") {
    // if (queue.length < 2) {return;}
    if (buffer !== "") {queue.push(parseFloat(buffer)); buffer="";}
    if (sym !== " ") {queue.push(sym);}
  }
  else if (parseInt(sym) !== NaN || sym == ".") {buffer += sym;}
  drawScreen();
}

function calculate() {
  var stack = [];
  buffer = queue.reduce(function(acc,val) {
    if(val == "+") {return stack[stack.push(stack.pop() + stack.pop())-1];}
    if(val == "-") {var a = stack.pop(); return stack[stack.push(stack.pop() - a)-1];}
    if(val == "*") {return stack[stack.push(stack.pop() * stack.pop())-1];}
    if(val == "/") {return stack[stack.push(stack.pop() / stack.pop())-1];}
    stack.push(val); return acc;
  }, 0);
  queue = [];
  drawScreen();
}

function backspace() {
  if (buffer !== "") {var a = buffer.split(""); a.pop(); buffer = a.join("");}
  else if (queue.length > 0) {queue.pop();}
  drawScreen();
}

function clearMem() {
  buffer = "";
  queue = [];
  drawScreen();
}
