import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import $ from 'jquery';

export default class CalculatorComponent extends Component {
  @service operationSolver;
  @tracked displayText = "0";
  @tracked operatorPressed = false;
  @tracked isRightOperand = false;
  
  focus(element){
    element.focus();
  }

  @action
  keyDown(event){
    if(event.keyCode == 13){
      this.getResult();
      return;
    }

    if(this.isNumericOrDecimalPoint(event.keyCode)){
      this.addNumberOrDotToDisplay(event.key);
      return;
    }
    
    if(this.isOperator(event.keyCode)){
      this.executeOperation(event.key);
      return;
    } 
  }

  @action
  addNumberOrDotToDisplay(input){
    if(input == "." && this.displayText.indexOf(".") !== -1){
      return;
    }

    if(this.displayText === "0" || this.operatorPressed){
      if(input == "."){
        this.displayText = "0".concat(input.toString());
      } else {
        this.displayText = input.toString();
      }

      this.operatorPressed = false;
    } else {
      this.displayText = this.displayText.concat(input);
    }
  }

  @action
  executeOperation(operator){
    if(this.hasErrors()){
      this.clear();
      return;
    }

    this.operatorPressed = true;

    if(!this.isRightOperand){
      this.operationSolver.setLeftOperandAndOperator(this.displayText, operator);
      this.isRightOperand = true;
      return;
    }
    
    this.displayText = this.operationSolver.calculate(this.displayText, operator);
    this.isRightOperand = false;
  }

  @action
  getResult(){
    if(this.hasErrors()){
      this.clear();
      return;
    }

    this.operatorPressed = true;
    this.isRightOperand = false;
    this.displayText = this.operationSolver.getResult(this.displayText);
  }

  @action
  clear(){
    this.displayText = "0";
    this.isRightOperand = false;
    this.operatorPressed = false;
    this.operationSolver.cleanOperation();
  }

  get numberMatrix(){
    const matrix = []
    const rows = 3, cols = 3;

    for(let row=1; row <= rows; row++){
      const matrixRow= []
      for(let col=1; col <= cols; col++){
        matrixRow.push((9-(cols*row))+col);
      }

      matrix.push(matrixRow);
    }

    return matrix;
  }

  isNumericOrDecimalPoint(keyCode){
    return (keyCode >= 48 && keyCode <= 57) || keyCode === 190;
  }

  isOperator(keyCode){
    return [107,109,106,111].includes(keyCode);
  }

  hasErrors(){
    return this.displayText === "Error";
  }
}
