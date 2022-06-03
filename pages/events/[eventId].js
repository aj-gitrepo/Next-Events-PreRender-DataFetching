import { useRouter } from "next/router";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content.js";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert.js";
import Button from "../../components/ui/button.js";

import { getEventBYId } from "../../dummy-data";

const EventDetailPage = () => {
  const router = useRouter();
  console.log(router.query);
  const eventId = router.query.eventId;
  const event = getEventBYId(eventId);

  if(!event.length) {
    return (
      <ErrorAlert>
        <p style={{ marginBottom: "25px" }}>No event Found!</p>
        <Button link="/events">Show all events</Button>
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

// <Fragment> allows to have adjacent element
