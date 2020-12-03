const router = require("express").Router();
const markerRoutes = require("./marker");

// Book routes
router.use("/marker", markerRoutes);

module.exports = router;
