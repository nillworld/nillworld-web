const wellcome = require("nillworld");
const thisfilefullname = document.URL.substring(
  document.URL.lastIndexOf("/") + 1,
  document.URL.length
);

wellcome(thisfilefullname);
