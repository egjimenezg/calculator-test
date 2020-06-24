import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class CalculatorComponent extends Component {
  @service operationSolver;
  @tracked displayText = "0";
  @tracked operatorPressed = false;
  @tracked isRightOperand = false;

  @action
  addNumberToDisplay(number){
    if(this.operatorPressed)
      this.isRightOperand = true;

    if(this.displayText === "0" || this.operatorPressed){
      this.displayText = number.toString();
      this.operatorPressed = false;
    } else {
      this.displayText = this.displayText.concat(number);
    }
  }

  @action
  addDecimalPointToDisplay(){
    if(this.operatorPressed){
      this.displayText = ".";
      this.operatorPressed = false;
    }
    else if(this.displayText.indexOf(".") === -1){
      this.displayText = this.displayText.concat(".");
    }
  }

  @action
  executeOperation(operator){
    this.operatorPressed = true;
    this.displayText = this.operationSolver.calculate(this.displayText, operator, this.isRightOperand);
    this.isRightOperand = false;
  }

  @action
  getResult(){
    this.operatorPressed = true;
    this.displayText = this.operationSolver.getResult(this.displayText);
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

}
