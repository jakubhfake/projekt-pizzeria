import { select, templates} from '../settings.js';

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

    thisHome.dom.carouselWidget = thisHome.dom.wrapper.querySelector(select.widgets.carouselWidget.wrapper);
  }

  
  initPlugin() {
    const thisHome = this;
    // eslint-disable-next-line no-undef
    thisHome.flkty = new Flickity( thisHome.dom.carouselWidget, {
    // options
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      prevNextButtons: false,
      // autoPlay: true,
    });
  }
}
export default Home;