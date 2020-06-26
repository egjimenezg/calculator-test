import Service from '@ember/service';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class OperationSolverService extends Service {
  @tracked result = Number(0);
  @tracked operator = "";

  operations = {
    "+": this.sum,
    "-": this.subtract,
    "*": this.multiply,
    "/": this.divide
  };

  setLeftOperandAndOperator(leftOperand, operator){
    this.result = Number(leftOperand);
    this.operator = operator;
  }

  calculate(currentValue, operator){
    try {
      this.result = this.operations[this.operator](this.result, Number(currentValue));
    } catch(e){
      return e.message;
    }

    this.operator = operator;
    return this.result.toString() 
  }

  sum(left, right){
    return left + right;
  }

  subtract(left,right){
    return left-right;
  }
  
  multiply(left,right){
    return left*right;
  }

  divide(left,right){
    if(right === Number("0")){
      throw new Error("Error: Division by 0");
    }
    
    return left/right; 
  }

  getResult(currentValue){
    if(isEmpty(this.operator)){
      this.result = Number(currentValue);
      return currentValue; 
    }

    try{
      const operationResult = this.operations[this.operator](this.result, Number(currentValue));
      this.cleanOperation();
      return operationResult.toString();
    } catch(e) {
      return e.message;
    }
  }

  cleanOperation(){
    this.operator = "";
    this.result = Number(0);
  }

  isInputValid(operand, operator){
    return this.isOperandValid(operand) && this.isOperatorValid(operator);
  }

  isOperandValid(operand){
    const numbersRegex = /^[0-9]+\.?([0-9]+)?$/;
    return numbersRegex.test(operand);
  }

  isOperatorValid(operator){
    return Object.keys(this.operations).includes(operator);
  }

}
