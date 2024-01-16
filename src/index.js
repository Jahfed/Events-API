import express from "express";
import * as Sentry from '@sentry/node';
import 'dotenv/config';

import categoriesRouter from "./routes/categoryRoute.js";
import userRouter from "./routes/userRoute.js";
import eventRouter from "./routes/eventRoute.js";
import loginRouter from './routes/login.js';
import log from './middleware/logMiddleware.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

Sentry.init({
  dsn: "https://f970886fe67cc303166ac6d6a4ed38a3@o4506376963686400.ingest.sentry.io/4506423231447040",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
});


app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(log);

app.use("/categories", categoriesRouter);
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use('/login', loginRouter);

app.get("/", (req, res) => {
  res.send("Hello worlds!");
});


app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


