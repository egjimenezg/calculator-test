import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class CalculatorComponent extends Component {
  @service operationSolver;
  @tracked numberButtons = [...Array(10).keys()];
  @tracked displayText = "0";

  @action
  addNumberToDisplay(number){
    if(this.displayText === "0"){
      this.displayText = number.toString();
    } else if(!isEmpty(this.operationSolver.getLeftOperand()) && isEmpty(this.operationSolver.getRightOperand())){
      this.displayText = number.toString();
      this.operationSolver.setRightOperand(this.displayText);
    } else {
      this.displayText = this.displayText.concat(number);
    }
  }

  @action
  addDecimalPointToDisplay(){
    if(this.displayText.indexOf(".") === -1){
      this.displayText = this.displayText.concat(".");
    }
  }

  @action
  executeOperation(operator){
    this.displayText = this.operationSolver.solve(this.displayText, operator);
  }

  @action
  getResult(){
    this.displayText = this.operationSolver.getResult();
  }

}
