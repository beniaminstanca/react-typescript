import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/events/EventsList";

function EventsPage() {
  const data = useLoaderData() as any;
  // if(data.error){
  //   return <p>{data.mes}</p>
  // }
  const events = data.events;
  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({message: 'Could not fetch events'}),{status: 500})
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    return response;
  }
}
