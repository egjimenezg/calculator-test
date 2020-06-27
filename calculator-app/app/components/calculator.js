import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CalculatorComponent extends Component {
  @service operationSolver;
  @tracked displayText = "0";
  @tracked operatorPressed = false;
  @tracked equalPressed = false;
  @tracked isRightOperand = false;
  
  focus(element){
    element.focus();
  }

  @action
  keyDown(event){
    if(event.key === '=' ||  event.keyCode === 13){
      event.preventDefault();
      this.clickButton('equal-button');
      return;
    }

    if(event.key === "Clear"){
      this.clickButton("clear-button");
      return;
    }

    if(this.isNumericOrDecimalPoint(event.key)){
      const selector = (event.key === ".") ? "decimal-point" : `button-${event.key}`;
      this.clickButton(selector);
      return;
    }
    
    if(this.isOperator(event.key)){
      this.clickButton(this.getOperatorSelector(event.key));
      return;
    } 
  }

  @action
  addNumberOrDotToDisplay(input){
    if(this.hasErrors()){
      this.clear();  
      return;
    }

    if(this.operatorPressed){
      this.isRightOperand = true;
    }

    if(this.canScreenBeOverwritten()){
      if(input === "."){
        this.displayText = "0".concat(input.toString());
      } else {
        this.displayText = input.toString();
      }

      this.operatorPressed = false;
      this.equalPressed = false;
    } else if(input === "." && this.displayText.indexOf(".") !== -1){
      return;
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

    if(!this.operationSolver.isInputValid(this.displayText, operator)){
      this.displayText = "Error: Invalid input";
      return;
    }

    this.operatorPressed = true;
    
    if(!this.isRightOperand){
      this.operationSolver.setLeftOperandAndOperator(this.displayText, operator);
      return;
    }

    this.displayText = this.operationSolver.calculate(this.displayText, operator);
    this.isRightOperand = false;
  }

  @action
  changeSign(){
    this.displayText = (Number(this.displayText)*-1).toString();
  }

  @action
  getResult(){
    if(this.hasErrors()){
      this.clear();
      return;
    }

    if(!this.operationSolver.isOperandValid(this.displayText)){
      this.displayText = "Error: Invalid input";
      return;
    }

    this.equalPressed = true;
    this.isRightOperand = false;
    this.operatorPressed = false;
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

  isNumericOrDecimalPoint(key){
    return (key >= 0 && key <= 9) || key === ".";
  }

  isOperator(key){
    return ['+','-','*','/'].includes(key);
  }

  canScreenBeOverwritten(){
    return this.displayText === "0" || this.operatorPressed || this.equalPressed;
  }

  hasErrors(){
    return this.displayText.startsWith("Error");
  }

  getOperatorSelector(operator){
    const selectors = {
      "+": "sum-button",
      "-": "subtract-button",
      "*": "multiply-button",
      "/": "division-button"
    };

    return selectors[operator];
  }

  clickButton(selector){
    document.querySelector(`#${selector}`).focus();
    document.querySelector(`#${selector}`).click();
  }
}
