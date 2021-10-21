import {classNames, select, templates} from '../settings.js';
import app from '../app.js';


class Home {
  constructor(element){
    const thisHome = this;
    thisHome.render(element);
    thisHome.initPlugin();
    thisHome.initAction();
  }

  render(element) {
    const thisHome = this;
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    const generatedHTML = templates.homeWidget();
    thisHome.dom.wrapper.innerHTML = generatedHTML;

    thisHome.dom.carouselWidget = thisHome.dom.wrapper.querySelector(select.widgets.carouselWidget.wrapper);
    thisHome.dom.buttonBooking = thisHome.dom.wrapper.querySelector(select.homePage.buttonBooking);
    thisHome.dom.buttonOrder = thisHome.dom.wrapper.querySelector(select.homePage.buttonOrder);
    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);
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
      autoPlay: true,
    });
  }

  initAction() {
    const thisHome = this;

    // thisHome.dom.buttonOrder.addEventListener('click', function(event){
    //   event.preventDefault();
    //   console.log('Button Order is clicked');
    //   app.activatePage('order');
    // });

    thisHome.dom.buttonBooking.addEventListener('click', function(event){
      event.preventDefault();
      console.log('Button Booking is clicked');
      thisHome.pages[0].classList.remove(classNames.pages.active);
      thisHome.navLinks[0].classList.remove(classNames.nav.active);
      thisHome.pages[2].classList.add(classNames.pages.active);
      thisHome.navLinks[2].classList.add(classNames.nav.active);
      // app.activatePage();
    });
  }

}
export default Home;