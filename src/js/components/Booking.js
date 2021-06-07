import {templates, select} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';

class Booking {
  constructor(element) {
    const thisBooking = this;
    thisBooking.renderBookingMenu(element);
    thisBooking.initWidgets();
  }
  renderBookingMenu(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount =  thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount =  thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount) ;
    thisBooking.dom.datePicker = document.querySelector(select.widgets.datePicker.wrapper);
  }
  initWidgets() {
    const thisBooking = this;
    thisBooking.peopleAmountWidget = new AmountWidget(
      thisBooking.dom.peopleAmount, thisBooking.dom.hoursAmount);
    thisBooking.dom.peopleAmount.addEventListener ('click', function(){});
    thisBooking.hoursAmountWidget = new AmountWidget(
      thisBooking.dom.hoursAmount);
    thisBooking.dom.hoursAmount.addEventListener ('click', function(){});

    thisBooking.datePicker = new DatePicker (thisBooking.dom.datePicker);
    thisBooking.dom.datePicker.addEventListener ('click', function(event){
      event.preventDefault();
      thisBooking.removeTables();
    });
  }
}
export default Booking;