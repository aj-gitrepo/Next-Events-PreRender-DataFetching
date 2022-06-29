import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-utils";

const AllEventsPage = (props) => {
  const router = useRouter();
  const events = props.events;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler}/>
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  const events = [];

  for (const key in allEvents) {
    events.push({
      id: key,
      ...allEvents[key]
    });
  };

  return {
    props: {
      events
    },
    revalidate: 60
  };
}
