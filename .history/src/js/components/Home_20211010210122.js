import {templates} from '../settings.js';
import Flickity from 'flickity';

class Home {
  constructor(element){
    const thisHome = this;
    thisHome.render(element);
  }

  render(element) {
    const thisHome = this;
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    const generatedHTML = templates.homeWidget();
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }

  initPlugin() {
    const thisHome = this;
    const carouselWidget = document.querySelector('.main-carousel');
    const flkty = new Flickity( carouselWidget, {
    // options
    cellAlign: 'left',
    contain: true
});
  }

}
export default Home;