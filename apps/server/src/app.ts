import configureOpenAPI from "@/libs/configure-open-api";
import createApp from "@/libs/create-app";


const app = createApp();

configureOpenAPI(app);

// const routes = [
//     index,
//     tasks,
// ] as const;

// routes.forEach((route) => {
//     app.route("/", route);
// });

// export type AppType = typeof routes[number];

export default app;