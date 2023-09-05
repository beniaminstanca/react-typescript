import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/navigation/EventsNavigation"

function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
