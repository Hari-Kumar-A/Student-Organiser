const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expensesController");
const categorylimitsController = require("../controllers/categorylimitsController");


// Showing all expenses
router.get("/", expensesController.expensespage);

// Adding expense
router.get("/addexpense", expensesController.addExpense);
router.post("/addexpense", expensesController.postExpense);

// View expense
router.get("/view/:id", expensesController.viewpage);

// Edit expense
router.get("/edit/:id", expensesController.editpage);
router.put("/edit/:id", expensesController.posteditpage);

// Delete expense
router.get("/delete/:id", expensesController.deletepage);
router.delete("/delete/:id", expensesController.postdeletepage);

// Calendar view of expenses
router.get("/calendarexpense", expensesController.calendarpage);

// Search expenses by category
router.post("/search", expensesController.searchpage);

//showing all expenses/categorylimits
router.get("/categorylimits",categorylimitsController.categorylimitspage
);

//adding category & limit
router.get("/categorylimits/addcategorylimit",categorylimitsController.addcategorylimit);
router.post( "/categorylimits/addcategorylimit",  categorylimitsController.postcategorylimit);

//edit category & limit
router.get(  "/categorylimits/edit/:id",categorylimitsController.editpage
);
router.put(  "/categorylimits/edit/:id",  categorylimitsController.posteditpage);

//Delete category & limit
router.get( "/categorylimits/delete/:id",  categorylimitsController.deletepage);
router.delete(  "/categorylimits/delete/:id",  categorylimitsController.postdeletepage);

module.exports = router;
