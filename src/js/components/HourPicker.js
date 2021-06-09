//import {settings, select} from '../settings.js';
//import utils from '../utils.js';
//import BaseWidget from './BaseWidget.js';

import BaseWidget from './BaseWidget.js';

class HourPicker extends BaseWidget {
  constructor(wrapper) {
    const thisWidget = this;

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