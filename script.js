const display = document.querySelector('.display')
const allClear = document.querySelector('.all-clear')
const flipButton = document.querySelector('.pos-to-neg')
const percentButton = document.querySelector('.percent')
const addButton = document.querySelector('.add')
const subtractButton = document.querySelector('.subtract')
const multiplyButton = document.querySelector('.multiply')
const divideButton = document.querySelector('.divide')
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const decimalButton = document.querySelector('.decimal')
const equalsButton = document.querySelector('.equals')
const currentString = document.querySelector('.current')
const previousString = document.querySelector('.previous')
let runningTotal = []

for (const button of numberButtons) {
    button.addEventListener('click', () => {
        if (runningTotal[runningTotal.length-1] === 'Nice try.') return
        else if(currentString.textContent === '0') {
            currentString.textContent = `${button.textContent}`
            runningTotal.push(button.textContent)
        }
        else if (runningTotal[runningTotal.length-1] === '+'
        || runningTotal[runningTotal.length-1] === '-'
        || runningTotal[runningTotal.length-1] === 'x'
        || runningTotal[runningTotal.length-1] === '/') {
            return currentString.textContent = replace(currentString.textContent.length-1, `${button.textContent}`), runningTotal.push(button.textContent)
        }
        else {
            currentString.textContent += `${button.textContent}`
            runningTotal.push(button.textContent)
        }
    })   
}

for (const operator of operatorButtons) {
    operator.addEventListener('click', () => {
        if (currentString.textContent === '0') return
        else {
            previousString.textContent = currentString.textContent + operator.textContent
            currentString.textContent = '0'
            runningTotal.push(operator.textContent)
        }
    })   
}

flipButton.addEventListener('click', () => {
    currentString.textContent*=-1
    runningTotal.unshift('-1','x')
})

percentButton.addEventListener('click', () => {
    currentString.textContent/=100
    runningTotal.unshift('/','100')
})

allClear.addEventListener('click', () => {
    currentString.textContent='0'
    previousString.textContent=''
    runningTotal = []
})

decimalButton.addEventListener('click', () => {
    if (currentString.textContent.includes('.')) return
    else runningTotal.push('.'), currentString.textContent+='.'
})

addButton.addEventListener('click', () => {
    if (runningTotal[runningTotal.length-1] === '-'
    || runningTotal[runningTotal.length-1] === 'x'
    || runningTotal[runningTotal.length-1] === '/') {
        runningTotal[runningTotal.length-1] = '+'
    previousString.textContent = previousString.textContent.replace(/[-x/]$/,'+')
    }
})

subtractButton.addEventListener('click', () => {
    if (runningTotal[runningTotal.length-1] === '+'
    || runningTotal[runningTotal.length-1] === 'x'
    || runningTotal[runningTotal.length-1] === '/') {
        runningTotal[runningTotal.length-1] = '-'
    previousString.textContent = previousString.textContent.replace(/[+x/]$/,'-')
    }
})

multiplyButton.addEventListener('click', () => {
    if (runningTotal[runningTotal.length-1] === '-'
    || runningTotal[runningTotal.length-1] === '+'
    || runningTotal[runningTotal.length-1] === '/') {
        runningTotal[runningTotal.length-1] = 'x'
        previousString.textContent = previousString.textContent.replace(/[-+/]$/,'x')
    }
})

divideButton.addEventListener('click', () => {
    if (runningTotal[runningTotal.length-1] === '-'
    || runningTotal[runningTotal.length-1] === 'x'
    || runningTotal[runningTotal.length-1] === '+') {
        runningTotal[runningTotal.length-1] = '/'
        previousString.textContent = previousString.textContent.replace(/[-+x]$/,'/')
    }
})

equalsButton.addEventListener('click', () => {
    if (runningTotal[runningTotal.length-1] === '+'
    || runningTotal[runningTotal.length-1] === '-'
    || runningTotal[runningTotal.length-1] === 'x'
    || runningTotal[runningTotal.length-1] === '/'
    || runningTotal[runningTotal.length-1] === 'Nice try.') return
    else if (runningTotal[runningTotal.length-2] === '/'
    && runningTotal[runningTotal.length-1] === '0') return currentString.textContent = 'Nice try.', runningTotal.push('Nice try.')
    else {
        if (previousString.textContent.includes('x')) {
            currentString.textContent = parseFloat(currentString.textContent) * parseFloat(previousString.textContent)
            previousString.textContent = ''
        }
        else if (previousString.textContent.includes('/')) {
            currentString.textContent = parseFloat(previousString.textContent) / parseFloat(currentString.textContent)
            previousString.textContent = ''
        }
        else if (previousString.textContent.includes('+')) {
            currentString.textContent = parseFloat(currentString.textContent) + parseFloat(previousString.textContent)
            previousString.textContent = ''
        }
        else if (previousString.textContent.includes('-')) {
            currentString.textContent = parseFloat(previousString.textContent) - parseFloat(currentString.textContent)
            previousString.textContent = ''
        }
        
    }
})