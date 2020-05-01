import LogsPage from "../components/logsPage.vue";
import LoginPage from "../components/loginPage.vue";
import UsagePage from "../components/usagePage.vue";

const definedRoutes = [
  {
    path: "/logs",
    component: LogsPage,
  },
  {
    path: "/usage",
    component: UsagePage,
  },
  {
    path: "/*",
    component: LoginPage,
  },
];

export default definedRoutes;
