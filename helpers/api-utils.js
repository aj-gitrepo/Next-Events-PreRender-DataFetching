export const getAllEvents = async () => {
  const response = await fetch('https://next-datafetching-42faa-default-rtdb.firebaseio.com/events.json');
  const data = await response.json();

  const events = [];
  for( const key in data ) {
    events.push({
      id: key, //to include id as a field
      ...data[key]
    });
  }

  return events;

}

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export const getEventBYId = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.id === id);
}

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents()

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

