const router = require("express").Router();
const markerController = require("../../controller/marker-controller");

// Matches with "/api/marker"
router.route("/")
  .get(markerController.findAll)
  .post(markerController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(markerController.findById)
//   .put(markerController.update)
//   .delete(markerController.remove);

module.exports = router;
