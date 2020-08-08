import LayoutBasic from "../layouts/LayoutBasic";

import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import User from "../pages/User";


const routes = [
 {
     path: "/",
     exact: true,
     layout: LayoutBasic,
     page: Home
 },
 {
    path: "/:username",
    layout: LayoutBasic,
    exact: true,
    page: User

 },
 {
     layout: LayoutBasic,
     page: Error404
 }

]


export default routes;