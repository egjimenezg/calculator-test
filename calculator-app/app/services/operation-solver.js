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
      this.cleanOperation();
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
    if(right == Number("0")){
      throw new Error("Error");
    }
    
    return left/right; 
  }

  getResult(currentValue){
    if(isEmpty(this.operator)){
      this.result = Number(currentValue);
      return currentValue; 
    }

    try{
      const operationResult = this.operations[this.operator](this.result, Number(currentValue)).toString();
      this.cleanOperation();
      return operationResult.toString();
    } catch(e) {
      this.cleanOperation();
      return e.message;
    }
  }

  cleanOperation(){
    this.operator = "";
    this.result = Number(0);
  }

}
