import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import { useEffect } from "react";

function RootPage() {
  const token = useLoaderData();
  const submit = useSubmit();
  //   const navigation = useNavigation();

  useEffect(() => {
    if (!token) {
      return;
    }
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, 1 * 60 * 16 * 1000);
  }, [token, submit]);

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
