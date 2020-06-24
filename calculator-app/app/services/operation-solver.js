import Service from '@ember/service';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default class OperationSolverService extends Service {
  leftOperand = "";
  rightOperand = "";
  operator = "";
  operations = {
   "+": this.sum,
   "-": this.subtract,
   "*": this.multiply,
   "/": this.divide
  };

  solve(operand, pressedOperator){
    if(operand === "0")
      return operand;

    if(isEmpty(this.leftOperand)){
      this.leftOperand = operand;
      this.operator = pressedOperator;
      return this.leftOperand;
    }

    this.rightOperand = operand;

    if(!isEmpty(this.operator)){
      this.leftOperand = this.operations[this.operator](this.leftOperand, this.rightOperand);
    } else {
      this.leftOperand = this.operations[pressedOperator](this.leftOperand, this.rightOperand);
    } 

    delete this.rightOperand;

    this.operator = pressedOperator;

    return this.leftOperand;
  }

  sum(left, right){
    return (BigInt(left) + BigInt(right)).toString();
  }

  subtract(left, right){
    return (BigInt(left) - BigInt(right)).toString();
  }
  
  multiply(left, right){
    return (BigInt(left) * BigInt(right)).toString();
  }

  divide(left, right){
    if(right == "0"){
      return "Error";
    }
    
    return (BigInt(left) / BigInt(right)).toString();
  }

  getRightOperand(){
    return this.rightOperand;
  }

  setRightOperand(rightOperand){
    this.rightOperand = rightOperand;
  }

  getLeftOperand(){
    return this.leftOperand;
  }

}
