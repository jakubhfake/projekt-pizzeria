import {templates} from '../settings.js';

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
    const  carouselWidget = document.querySelector('.main-carousel');
    const thisflkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});
  }

}
export default Home;