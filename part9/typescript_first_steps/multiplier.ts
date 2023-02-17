type Operation = 'add'|'sub'|'divide';

const multiplier = (a: number, b: number, op: Operation) => {
    switch (op) {
        case "add":
            console.log(a + b);
            break;
        case "sub":
            console.log(a - b);
            break;
        case "divide":
            console.log(a / b);
    }
}

multiplier(4,  5, "divide" )