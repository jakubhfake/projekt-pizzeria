import {settings, select} from '../settings.js';
//import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';

class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super (wrapper, settings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widget.hourPicker.output);

  }
  initPlugin() {
    const thisWidget = this;
    rangeSlider.create(thisWidget.dom.input);
  }

  parseValue(value){
    return value;
  }
      
  isValid(){
    return true;
  }
      
  renderValue(){
      
  }
}
export default HourPicker;