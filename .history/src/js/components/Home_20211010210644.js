import {templates} from '../settings.js';
import Flickity from '../../vendor/flickity.pkgh.min.js';

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
    thisflkty = new Flickity( carouselWidget, {
    // options
      cellAlign: 'left',
      contain: true
    });
  }

}
export default Home;