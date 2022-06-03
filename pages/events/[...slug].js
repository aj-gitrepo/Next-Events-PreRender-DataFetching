import { useRouter } from "next/router";
import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;

  if(!filterData) {
    return <p className="center">Loading...</p> //style from global css
  }
  // console.log(filterData); //Array [ "2021", "12" ]

  const filteredYear = filterData[0];
  const filterMonth = filterData[1];

  const numYear = +filteredYear; //to convert str to num
  const numMonth = +filterMonth;

  if(
    isNaN(numYear) || //notANumber
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p style={{ marginBottom: "25px" }}>Invalid Filter. Please adjust your values</p>
          <Button link="/events">Show all events</Button>
        </ErrorAlert>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if(!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p  style={{ marginBottom: "25px" }}>No events found for the chosen filter</p>
          <Button link="/events">Show all events</Button>
        </ErrorAlert>
        
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
