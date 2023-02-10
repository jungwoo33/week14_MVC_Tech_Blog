const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes); // call /api/index.js -> /api/users/~~~
router.use('/', homeRoutes); // call /controllers/home-routes.js -> /~~~
router.use('/dashboard',dashboardRoutes); // call /controllers/dashboard-routes.js -> /dashboard/~~~

router.use((req, res) => {
   res.status(404).end();
}); 

module.exports = router;
