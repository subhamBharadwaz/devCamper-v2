const express = require("express");
const { getCourses } = require("../controller/courses");

const router = express.Router({ mergeParams: true }); // We are merging the URL param

router.route("/").get(getCourses);

module.exports = router;
