import {templates} from '../settings.js';


class Home {
  constructor(element){
    const thisHome = this;
    thisHome.render(element);
    thisHome.initPlugin();
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
    // eslint-disable-next-line no-undef
    thisHome.flkty = new Flickity( carouselWidget, {
    // options
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      prevNextButtons: false,
      "autoPlay": true,
    });
  }

}
export default Home;