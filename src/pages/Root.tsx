import { Outlet } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";

function RootPage() {
//   const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootPage;
