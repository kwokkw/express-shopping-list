## Steps

1.  Basic Project Setup:

    - Create a new folder for the exercise:

      - `mkdir express-routing`
      - `cd express-routing`

    - Initialize a new Node.js project:

      - `npm init -y`

      `-y` is used to automatically generate a `package.json` file with default settings. It saves time for setting up a quick project or do not need to customize the `package.json` fields. The file can be edited manually later.

      This creates a `package.json` file.

    - Install dependencies:

      - `npm install express`
      - `npm install nodemon`
      - `npm install --save-dev jest supertest`

    - Project Structure

    express-shopping-list/
    |
    |--- routes/
    | |
    | |--- list.js # Routes for handling shopping list
    | |--- list.test.js
    |
    |--- app.js # Express app setup
    |--- server.js # Server entry point
    |--- fakeDb.js # Simulated database
    |--- expressError.js
    |--- package.json
    |--- README.md

2.  Create `fakeDb.js` to simulate database
3.  Configures the app and routes in `app.js`

    ```js
    import express from "express";
    import { router as listRoutes } from "./routes/list.js";

    const app = express();

    // Middleware to parse JSON
    app.use(express.json());

    // Mount routes
    app.use("/list", listRoutes);

    export default app;
    ```

4.  Create server using ES Modules:

    - Enable ES Modules in the exercise:

      ```json
      {
        "type": "module"
      }
      ```

      This tells Node.js to interpret files as ES Modules.

    - Create Server File: `touch server.js`

    - Write the Express Server Code:

      ```js
      import app from "./app.js";

      app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
      });
      ```

    - Start the server by running: `node server.js`

5.  Define `list.js`:

    ```js
    import express from "express";
    import { ExpressError } from "../expressError.js";
    import { items } from "../fakeDb.js";

    export const router = express.Router();

    router.get("/", function (req, res) {
      return res.send(items);
    });
    ```

6.  Install Nodemon

    - Nodemon restarts server automatically.

      - Install globally: `$npm install --global nodemon`
      - To start server: `$nodemon app.js`

7.  Test the API
8.  Tell Express to parse JSON data from the request body:

    - `app.use(express.json());`
