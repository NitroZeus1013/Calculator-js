console.log("its working");
var inputFromKeypad = "";

function calculate(){
    const input = document.getElementById("input-box")
    const inputexp = input.value;
    // console.log(inputexp);
    infixToPostfix(inputexp);
    inputFromKeypad="";
}


function preced(a){
    if(a==='/' || a==='*')return 2;
   if(a==='+' || a==='-')return 1;
}

// 2.5-1.5
// -6-6  6,-6,-
function infixToPostfix(inputexp){
    let operators=[];
    let output="";
    for(let i =0 ;i<inputexp.length;i++){
        if(inputexp[i]>='0' && inputexp[i]<='9'){
            output+=inputexp[i];
        }
        else if(inputexp[i]==='+' ||inputexp[i]==='-' ||inputexp[i]==='*' ||inputexp[i]==='/'){
            //handles the condition when we have -ve sign before number also in case of floating numbers.
            
            if((output.length!=0)) output+=',';
            while(operators.length!=0 && preced(inputexp[i])<=preced(operators[operators.length-1])){
               
                output+=operators.pop();
                output+=',';//handles when when popping operators just as in while below.
            }
            operators.push(inputexp[i]);
        }
        else{
            output+=inputexp[i];
        }
    }
    while(!(operators.length==0)){
        output+=',';
        output+=operators.pop();
    }
    console.log(output);
    evaluate(output);
}

// function infixToPostfix(inputexp){
//     let operators=[];
//     let output="";
//     for(let i =0 ;i<inputexp.length;i++){
//         if(inputexp[i]>='0' && inputexp[i]<='9'){
//             output+=inputexp[i];
//         }
//         else{
//             output+=',';
//             while(operators.length!=0 && preced(inputexp[i])< preced(operators[operators.length-1])){
               
//                 output+=operators.pop();
//             }
//             operators.push(inputexp[i]);
//         }
//     }
//     while(!(operators.length==0)){
//         output+=',';
//         output+=operators.pop();
//     }
//     // console.log(output);
//     evaluate(output);
// }

function evaluate(postfix){
    let tokens = postfix.split(",");
    console.log(tokens);
    let ansStack=[];
    for(let i =0 ;i<tokens.length;i++){
       
        if(tokens[i]==="+"){
            let op1 = ansStack.pop();
            let op2 = ansStack.pop();
            ansStack.push(op1+op2);
        }
        else if(tokens[i] ==="-"){
            let op1 = ansStack.pop();
            let op2 = ansStack.pop();
            if(op2===undefined)
            {
                ansStack.push(op1*(-1));
            }
            else{
                ansStack.push(op2-op1);
            }
            

            console.log({op1});
            console.log({op2});

        }
        else if(tokens[i] ==="*"){
            let op1 = ansStack.pop();
            let op2 = ansStack.pop();
            ansStack.push(op1*op2);
        }
        else if(tokens[i] ==="/"){
            let op1 = ansStack.pop();
            let op2 = ansStack.pop();
            ansStack.push(op2/op1);
        }
        else{
            ansStack.push(Number(tokens[i]));
        }

    }
    let result = Number(ansStack.pop())
    // console.log(result);
    setSecondaryDisplay(result);
    // console.log(ansStack.pop());
}


function setSecondaryDisplay(res){
    const secDis = document.getElementById("secondary-display");
    secDis.innerText = res;

}
function clearDisplay(){
    const secDis = document.getElementById("secondary-display");
    const priDis = document.getElementById("input-box");
    secDis.innerText = 0;
    priDis.value="";
    inputFromKeypad="";
}


function takeInputFromKeypad(a){
    
    inputFromKeypad +=a;
    const priDis = document.getElementById("input-box");
    priDis.value=inputFromKeypad;
}