# expresslayouthelper
Helps with using multiple layouts with express-ejs-layouts

## How it works
THe middleware automatically scans the /views directory and subdirs for layout.ejs files and applys the correct layout for the route
### Example
User goes to /user/edit

The middleware checks if there is a route in the /routes directory if there is, it checks if there is a layout.ejs file in the directory /views/user.

If both is true the layout will be set accordingly.

The index route is exempt from this check. Itll remain the default

## How to user
Copy the file "layoutManager.js" into your project

require the file and use it as a simple middleware

### Example

```js
const express = require('express');
const layoutManager = require('./helpers/layoutManager');
const layouts = require('express-ejs-layouts')


const app = express();

app.use(layouts);
app.use(layoutManager);

app.listen(3000)
```
