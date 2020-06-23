import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CalculatorComponent extends Component {
  @tracked buttons = [...Array(9).keys()].map((n) => n+1);
}
