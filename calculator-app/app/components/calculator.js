import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class CalculatorComponent extends Component {
  @service operationSolver;
  @tracked numberButtons = [...Array(10).keys()];
  @tracked displayText = "0";
  @tracked operatorPressed = false;

  @action
  addNumberToDisplay(number){
    if(this.displayText === "0"){
      this.displayText = number.toString();
    } else if(this.operatorPressed){
      this.displayText = number.toString();
      this.operatorPressed = false;
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
    this.operatorPressed = true;
    this.displayText = this.operationSolver.solve(this.displayText, operator);
  }

  @action
  getResult(){
    this.operatorPressed = true;
    this.displayText = this.operationSolver.getResult(this.displayText);
  }

}
