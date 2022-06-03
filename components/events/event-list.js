import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList = ({ items }) => {

  const renderItems = () => {
    return (
    items.map((event) => <EventItem key={event.id} item={event} />)
    );
  }

  return (
    <ul className={classes.list}>
      {renderItems()}
    </ul>
  );
}

export default EventList;
