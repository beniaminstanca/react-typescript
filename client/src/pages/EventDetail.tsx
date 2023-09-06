import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/events/EventItem";
import { getAuthToken } from "../util/auth";

function EventDetailPage() {
  const data: any = useRouteLoaderData('event-detail');

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export default EventDetailPage;

type MyParams = {
  eventId : any;
}

export async function loader({ request, params}:{request:Request, params: MyParams}) {
  const id = params.eventId;
  const response = await fetch(
    "http://localhost:8080/events/" + id
  );

  if (!response.ok) {
    // throw new Response(JSON.stringify({message: 'Could not fetch events'}),{status: 500})
    throw json({ message: "Could not fetch details for selected event" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action ({params, request}:{params:any, request:Request}) {
  const eventId = params.eventId;
  const token = getAuthToken();
  const response = await fetch(
    "http://localhost:8080/events/" + eventId, {
      method: request.method,
      headers:{
        'Authorization' : 'Bearer ' + token
      }
    });
    if (!response.ok) {
      // throw new Response(JSON.stringify({message: 'Could not fetch events'}),{status: 500})
      throw json({ message: "Could not delete event" }, { status: 500 });
    } 
    return redirect('/events');
}