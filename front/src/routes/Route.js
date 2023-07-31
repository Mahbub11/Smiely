import { Suspense, lazy } from "react";
import { Navigate, Routes, useRoutes } from "react-router-dom";

import { GeneralLayout } from "../layouts/GeneralLayout";
import { AuthenticateLayout } from "../layouts/AuthenticateLayout";
import BackdropLoader from "../layouts/BackdropLoader";
import SpinLoader from "../layouts/SpinLoader";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<SpinLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <GeneralLayout></GeneralLayout>,
      children: [
        { path: "login", element: <Login></Login> },
        { path: "signup", element: <SignUp></SignUp> },
        { path: "forgot-password", element: <ResetPassword></ResetPassword> },
        // { path: "register", element: <Register></Register> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <AuthenticateLayout></AuthenticateLayout>,
      children: [
        { path: "", element: <Home></Home> },
        { path: "/:username", element: <Profile></Profile> },
        {
          path: "/accounts/edit",
          element: (
            <UserEdit activeTab={0}>
              <UpdateProfile></UpdateProfile>
            </UserEdit>
          ),
        },
        {
          path: "/accounts/password/change",
          element: (
            <UserEdit activeTab={1}>
              <UpdateProfilePassword></UpdateProfilePassword>
            </UserEdit>
          ),
        },
        {
          path: "/direct/inbox",
          element: (
            <ChatBox></ChatBox>
          ),
        },
        {
          path: "/direct/t/:id",
          element: (
            <ChatBox></ChatBox>
          ),
        },
        {
          path: "/direct/t/:chatId/:userId",
          element: (
            <ChatBox></ChatBox>
          ),
        },
        

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

// the pages that will show under the hood of Lazy Loading...
const Page404 = Loadable(lazy(() => import("../components/Errors/NotFound")));
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const SignUp = Loadable(lazy(() => import("../pages/auth/SignUp")));
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);

// profile
const Profile = Loadable(lazy(() => import("../pages/user/Profile")));
const UserEdit = Loadable(lazy(() => import("../pages/user/update/Update")));
const UpdateProfile = Loadable(
  lazy(() => import("../pages/user/update/UpdateProfile"))
);
const UpdateProfilePassword = Loadable(
  lazy(() => import("../pages/user/update/UpdatePassword"))
);

//Home
const Home = Loadable(lazy(() => import("../pages/Home/Home")));
// Chat
const ChatBox = Loadable(lazy(() => import("../pages/Chat/Inbox")));
