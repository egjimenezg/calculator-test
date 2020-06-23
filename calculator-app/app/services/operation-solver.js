import Service from '@ember/service';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';

export default class OperationSolverService extends Service {
  leftOperand = "";
  rightOperand = "";
  operator = "";

  solve(operand, operator){
    if(operand === "0")
      return operand;

    this.operator = operator;

    if(isEmpty(this.leftOperand)){
      this.leftOperand = operand;
      return this.leftOperand;
    }

    this.rightOperand = operand;

    switch(operator){
      case '+':
        return this.sum();
      case '-':
        return "ERROR";
        break;
      case '*':
        return "ERROR";
        break;
      case '/':
        return "ERROR";
        break;
      default:
        return "ERROR";
    }
    
  }

  sum(){
    this.leftOperand = (BigInt(this.leftOperand) + BigInt(this.rightOperand)).toString();
    delete this.rightOperand;
    return this.leftOperand;
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
