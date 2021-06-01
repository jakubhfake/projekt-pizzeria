import {templates} from '../settings.js';

class Booking {
  constructor(element) {
    const thisBooking = this;
    thisBooking.renderBookingMenu(element);
    //thisBooking.initWidgets();
  }
  renderBookingMenu(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
  }
}
export default Booking;