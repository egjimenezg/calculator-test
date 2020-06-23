import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CalculatorComponent extends Component {
  @tracked numberButtons = [...Array(9).keys()].map((buttonNumber) => buttonNumber+1);
  @tracked result="" 

  @action
  addNumberToDisplay(number){
    this.result = this.result.concat(number);
  }

}
