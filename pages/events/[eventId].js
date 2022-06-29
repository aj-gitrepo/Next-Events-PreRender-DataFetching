// import { useRouter } from "next/router";
import { Fragment } from "react";

import EventContent from "../../components/event-detail/event-content.js";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert.js";
import Button from "../../components/ui/button.js";

import { getEventBYId, getFeaturedEvents } from "../../helpers/api-utils";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  const event = props.selectedEvent;

  if(!event.length) {
    return (
      <ErrorAlert>
        Loading...
      </ErrorAlert>
    );
  }

  const { date, location, image, title, description } = event[0]

  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistics 
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventBYId(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents(); //fetching all events may not be suitable for large list of events

  const paths = events.map(event => ({params: {eventId: event.id}}));
  return {
    paths,
    fallback: true
  }
}

// <Fragment> allows to have adjacent element
