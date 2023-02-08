console.log('jw');
const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes); // call /controllers/home-routes.js
router.use('/api', apiRoutes); // call /api/index.js
router.use('/dashboard',dashboardRoutes); // call /controllers/dashboard-routes.js

module.exports = router;
