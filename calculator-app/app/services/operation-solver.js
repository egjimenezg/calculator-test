import Service from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class OperationSolverService extends Service {
  result = Number(0);
  operator = "";
  operations = {
   "+": this.sum,
   "-": this.subtract,
   "*": this.multiply,
   "/": this.divide
  };

  calculate(currentValue, pressedOperator, isRightOperand){
    if(isEmpty(this.operator)){
      this.operator = pressedOperator;
      this.result = Number(currentValue);
      return this.result.toString();
    }

    if(isRightOperand){
      this.result = this.operations[this.operator](this.result, Number(currentValue));
    }

    this.operator = pressedOperator;

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
    if(right == Number("0")){
      return "Error";
    }
    
    return left/right; 
  }

  getResult(currentValue){
    if(isEmpty(this.operator)){
      this.result = currentValue;
      return this.result.toString(); 
    }

    const operationResult = this.operations[this.operator](this.result, Number(currentValue));

    delete this.operator;
    delete this.result;

    return operationResult.toString();
  }

}
