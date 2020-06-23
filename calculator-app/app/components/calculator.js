import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CalculatorComponent extends Component {
  @tracked numberButtons = [...Array(10).keys()];
  @tracked result = "";
  @tracked leftOperand;
  @tracked rightOperand;

  @action
  addNumberToDisplay(number){
    this.result = this.result.concat(number);
  }

  @action
  addDecimalPointToDisplay(){
    if(this.result.indexOf(".") === -1){
      this.result = this.result.concat(".");
    }
  }

}
