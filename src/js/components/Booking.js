import { templates, select, settings, classNames } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';
import utils from '../utils.js';

class Booking {
  constructor(element) {
    const thisBooking = this;
    thisBooking.renderBookingMenu(element);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.selectedTableId = null;
    
  }
  getData() {
    const thisBooking = this;
    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);
    const params = {
      booking: [startDateParam, endDateParam],
      eventsCurrent: [settings.db.notRepeatParam, startDateParam, endDateParam],
      eventsRepeat: [settings.db.repeatParam, endDateParam],
    };

    const urls = {
      bookings:
        settings.db.url +
        '/' +
        settings.db.booking +
        '?' +
        params.booking.join('&'),
      eventsCurrent:
        settings.db.url +
        '/' +
        settings.db.event +
        '?' +
        params.eventsCurrent.join('&'),
      eventsRepeat:
        settings.db.url +
        '/' +
        settings.db.event +
        '?' +
        params.eventsRepeat.join('&'),
    };
    
    Promise.all([
      fetch(urls.bookings),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function (allResponses) {
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function ([bookings, eventsCurrent, eventsRepeat]) {
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }
  // eslint-disable-next-line no-unused-vars
  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;
    thisBooking.booked = {};
    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;
    console.log('minDate', minDate);
    console.log('maxDate', maxDate);
    for (let item of eventsRepeat) {
      if(item.repeat == 'daily'){
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)){
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }
    
    thisBooking.updateDOM();
    thisBooking.selectedTable = null;
    
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;
    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }
    const startHour = utils.hourToNumber(hour);
    
    for(let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
      
    }
  }
  updateDOM(){
    const thisBooking = this;
    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);
    let allAvailable = false;
    thisBooking.selectedTableId = null;
    
    if(
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ){
      allAvailable = true;
    }
    
    for(let table of thisBooking.dom.tables){
      table.classList.remove(classNames.booking.tableSelected);
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if(!isNaN(tableId)){
        tableId = parseInt(tableId);
      }

      if(
        !allAvailable
        &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ){
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }


  renderBookingMenu(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.peopleAmount
    );
    thisBooking.dom.peopleAmountValue = thisBooking.dom.peopleAmount.querySelector(
      select.booking.peopleAmountValue);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.hoursAmount
    );
    thisBooking.dom.hoursAmountValue = thisBooking.dom.hoursAmount.querySelector(
      select.booking.hoursAmountValue);
       
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(
      select.widgets.datePicker.wrapper
    );
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(
      select.widgets.hourPicker.wrapper
    ); 
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(
      select.booking.tables
    );
    thisBooking.dom.allTables = thisBooking.dom.wrapper.querySelector(
      select.booking.allTables
    );
    
    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(
      select.booking.starters
    );
    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(
      select.booking.phone
    );
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(
      select.booking.address
    );
    thisBooking.dom.bookingForm = thisBooking.dom.wrapper.querySelector(
      select.booking.bookingForm
    );
    
  }
  initWidgets() {
    const thisBooking = this;
    thisBooking.peopleAmountWidget = new AmountWidget(
      thisBooking.dom.peopleAmount,
      thisBooking.dom.hoursAmount
    );
    thisBooking.dom.peopleAmount.addEventListener('click', function () {});
    thisBooking.hoursAmountWidget = new AmountWidget(
      thisBooking.dom.hoursAmount
    );
    thisBooking.dom.hoursAmount.addEventListener('click', function () {
      
    });

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.dom.datePicker.addEventListener('click', function (event) {
      event.preventDefault();
    });

    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    thisBooking.dom.hourPicker.addEventListener('updated', function (event) {
      event.preventDefault();
    });
    thisBooking.dom.wrapper.addEventListener('updated', function () {
      thisBooking.updateDOM();
    });
    thisBooking.dom.allTables.addEventListener('click', function(event) {
      event.preventDefault();
      thisBooking.initTables();
    });
    thisBooking.dom.bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();
      thisBooking.sendBooking();
    });
  }
  initTables(){
    const thisBooking = this;
    thisBooking.clickedTable = event.target;
    thisBooking.clickedTableId = thisBooking.clickedTable.getAttribute('data-table');
    const tableIncludeClassSelected = thisBooking.clickedTable.classList.contains(classNames.booking.tableSelected);
  
    
    if(thisBooking.clickedTable.classList.contains(classNames.floorPlan.tables)
      && !thisBooking.clickedTable.classList.contains(classNames.booking.tableBooked)) {

      thisBooking.selectedTableId = thisBooking.clickedTableId;
      if(!tableIncludeClassSelected) {
        thisBooking.clickedTable.classList.add(classNames.booking.tableSelected);
        
        for(let table of thisBooking.dom.tables){
          const tableId = table.getAttribute('data-table');
          if (table.classList.contains(classNames.booking.tableSelected)
            && tableId !== thisBooking.selectedTableId) {

            table.classList.remove(classNames.booking.tableSelected);
            
          }
        }
      }
      else if(tableIncludeClassSelected) {
        thisBooking.clickedTable.classList.remove(classNames.booking.tableSelected);
        thisBooking.selectedTableId = null;
      }
    }
    else if(thisBooking.clickedTable.classList.contains(classNames.booking.tableBooked)) {
      alert('Sorry but this table is occupied');
    }
    else {
      console.log('It isn\'t a table');
    }
  }

  sendBooking() {
    const thisBooking = this;
    const url = settings.db.url + '/' + settings.db.booking;
    const payload = {
      date: thisBooking.datePicker.value,
      hour: thisBooking.hourPicker.value,
      table: Number(thisBooking.selectedTableId),
      duration: Number(thisBooking.dom.hoursAmountValue.value),
      ppl: Number(thisBooking.dom.peopleAmountValue.value),
      starters: [],
      phone: thisBooking.dom.phone.value,
      address: thisBooking.dom.address.value,
    };
    for(let starter of thisBooking.dom.starters) {
      if(starter.checked == true) {
        payload.starters.push(starter.value);
      }
    }
    thisBooking.makeBooked(payload.date, payload.hour, payload.duration, payload.table);
    console.log('Payload data:', payload);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
      
    fetch(url, options);

  }
   
}

export default Booking;
