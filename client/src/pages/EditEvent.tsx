import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/events/EventForm";

function EditEventPage (){
    const data:any = useRouteLoaderData('event-detail');
    const event = data.event
    return <EventForm event={event} method={'PATCH'}/>
}

export default EditEventPage;