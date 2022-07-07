// Get html element
const screen = document.getElementById('screen');
const number = document.querySelectorAll('.numbers div');
const operator = document.querySelectorAll('.operator div');

// Delete function
const deleteNumber = () => {
  screen.firstChild.length == 1 ? 
  screen.innerText = 0 : 
  screen.innerText =  screen.innerText.slice(0, -1);
}

// Negative Function
const minusNumber = () => {
  screen.innerText.charAt(0) === '-' ? 
  screen.innerText = screen.innerText.slice(1,screen.firstChild.length) : 
  screen.innerText = '-' + screen.innerText;
}

// Calculation Logic
const calculation = (number,operations,operation) => {
  const index = operations.indexOf(`${operation}`)
  const x = number[index]
  const y = number[index + 1]
  let result = '';
  if (operation === '+') {
    result = parseFloat(x) + parseFloat(y)
  } else if (operation === '-') {
    result = x-y
  } else if (operation === 'x') {
    result = x*y
  } else if (operation === '/') {
    result = x/y
  }
  number.splice(index,2,result)
  operations.splice(index,1)
  return [number,operations]
}

// Result of the calculation
const calculationResult = (number,operations) => {
  while (operations.indexOf('x') != -1) {
    const result = calculation(number,operations,'x');
    number = result[0]
    operations = result[1]
  }
  
  while (operations.indexOf('/') != -1) {
    const result = calculation(number,operations,'/');
    number = result[0]
    operations = result[1]
  }

  while (operations.indexOf('-') != -1) {
    const result = calculation(number,operations,'-');
    number = result[0]
    console.log(number);
    operations = result[1]
  }

  while (operations.indexOf('+') != -1) {
    const result = calculation(number,operations,'+');
    number = result[0]
    operations = result[1]
  }

  screen.innerHTML = number[0]
  console.log('batas');
}

// Give event to number element
number.forEach(e => {
  e.addEventListener('click', () => {
    const screenLength = screen.firstChild.length;
    
    // Digit limitation
    if(screenLength >= 15 && e.innerText !== 'C' && e.innerText !== 'B') {
      alert('Maximum digit is 15!')
      return;
    }

    // Click conditions
    if (e.innerText === 'C') {
      screen.innerText = 0
    } else if (e.innerText === '+/-') {
      minusNumber();
    } else if (e.innerText === 'B') {
      deleteNumber();
    } else if(screen.innerText === '0' && e.innerText !== '.') {
      screen.innerText = e.innerText
    } else {
      screen.innerText += e.innerText;
    }
  });
});

// Give event to operator element
operator.forEach(e => {
  e.addEventListener('click', () => {
    
    if (e.innerText === '=') {
      // Get array of input number
      const screenNumbers = screen.innerHTML.split(/[+-/x]/)
      console.log(screenNumbers);
      
      // Get array of previous operator
      const previousOperator = screen.innerHTML.replace(/[0-9]|\./g, "").split("");
      
      // Call the function of the result
      calculationResult(screenNumbers,previousOperator)
      return;
    }
    
    const lastChar = screen.innerText.slice(-1,screen.firstChild.length)

    // Input operation if lastchar not number
    if ( lastChar !== '+' && lastChar !== '-' && lastChar !== 'x' && lastChar !== '/' && lastChar !== '=' && lastChar !== '%') {
      screen.innerText += e.innerText;
    } 

    // change operation if lastchar is different operation 
    if(lastChar !== e.innerText) {
      let x = screen.innerText.slice(0,-1);
      screen.innerText = x += e.innerText;
    } 
  });
});


