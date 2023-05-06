import {
    CHAT_ROUTE,
    DISCOVER_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE,
    SETTINGS_ROUTE
} from "../uutils/consts";
import {Register} from "../pages/Register/Register";
import {Login} from "../pages/Login/Login";
import {Home} from "../pages/Home/Home";
import {Settings} from "../pages/Settings/Settings";
import {Profile} from "../pages/Profile/Profile";
import {Discover} from "../pages/Discover/Discover";
import {Chat} from "../pages/Chat/Chat";

export const publicRoutes = [
    {
        path: REGISTER_ROUTE,
        Component: Register
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
];

export const privateRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: SETTINGS_ROUTE,
        Component: Settings
    },
    {
        path: DISCOVER_ROUTE,
        Component: Discover
    },
    {
        path: CHAT_ROUTE,
        Component: Chat
    },
]
