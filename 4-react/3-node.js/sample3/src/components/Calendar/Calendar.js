// import "react-dates/initialize";
// import "./reactdate.css";

import * as searchActions from "../../store/modules/seacher";

import React, { useState } from "react";

// import { DateRangePicker } from "react-dates";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

const Calendar = ({
  searchActions,
  startDay,
  endDay,
  displayHandler,
  totalPriceCalculator,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusInput] = useState(null);

  const onDatesChange = ({ startDate, endDate }) => {
    let checkin, checkout;
    setStartDate(startDate);
    setEndDate(endDate);

    if (startDate !== null && endDate !== null) {
      checkin = startDate.format("YYYY-MM-DD");
      checkout = endDate.format("YYYY-MM-DD");

      displayHandler && displayHandler();
      totalPriceCalculator && totalPriceCalculator(startDate, endDate);
    }
    //리덕스 store에 저장
    searchActions.getStartDay(checkin);
    searchActions.getEndDay(checkout);
  };

  return (
    <>
      <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) =>
          onDatesChange({ startDate, endDate })
        } // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => setFocusInput(focusedInput)} // PropTypes.func.isRequired,
        showClearDates={true}
        startDatePlaceholderText={!startDay ? "체크인" : startDay}
        endDatePlaceholderText={!endDay ? "체크아웃" : endDay}
      />
    </>
  );
};

const mapStateToProps = ({ seacher }) => ({
  location: seacher.location,
  startDay: seacher.startDay,
  endDay: seacher.endDay,
  adults: seacher.adults,
  children: seacher.children,
  infants: seacher.infants,
});

const mapDispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActions, dispatch),
  // AnotherActions: bindActionCreators(anotherActions, dispatch)
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Calendar)
);