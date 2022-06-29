import { useRouter } from "next/router";
import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
// import ErrorPage from "../../components/error-layout";
import { getFilteredEvents } from "../../helpers/api-utils";

const FilteredEventsPage = (props) => {
  const router = useRouter();
  // const filterData = router.query.slug;

  // if(!props.filterData) {
  //   return <p className="center">Loading...</p> //style from global css
  // }
 

  // const filteredYear = filterData[0];
  // const filterMonth = filterData[1];

  // const numYear = +filteredYear; //to convert str to num
  // const numMonth = +filterMonth;

  if( props.hasError ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p style={{ marginBottom: "25px" }}>Invalid Filter. Please adjust your values</p>
          <Button link="/events">Show all events</Button>
        </ErrorAlert>
      </Fragment>
    );
  }

  const filteredEvents = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {

  const { params } = context;
  const filterData = params.slug;

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
      return {
        props: {hasError: true},
        // Or
        // notFound: true, //returns default 404 page when redirect is not included
        // redirect: {
        //   destination: '/error'
        // }
      };
    }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }

}

// using getStaticProps with getStaticPath may require all possible combinations for the route
// so using getServerSideProps

 // console.log(filterData); //Array [ "2021", "12" ]
