const expensesmodel = require("../models/expensesmodel");
const categorylimitmodel = require("../models/categorylimitmodel");
const mongoose = require("mongoose");

//rendering addexpense page
module.exports.addExpense = async (req, res) => {
  try {
    const categorydata = await categorylimitmodel.find({
      studentId: req.session.studentId,
    });
    res.render("addExpense", { categorydata });
  } catch (error) { 
    res.status(500).send("An error occurred while adding expense");
  }
};

//adding expense by post
module.exports.postExpense = async (req, res) => {
  try {
    const category = req.body.category;
    const amount = parseInt(req.body.amount);

    // Fetch the category limit for the chosen category
    const categorydata = await categorylimitmodel.findOne({
      category: category,
    });
    // Calculate the total expenses for the selected category
    const result = await expensesmodel.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(req.session.studentId),
          category: req.body.category,
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const totalAmountForCategory =
      result.length > 0 ? result[0].totalAmount : 0;
    const balance = categorydata.categorylimit - totalAmountForCategory;
    // Check if the total expenses for the selected category exceed 5000 Rs
    if (totalAmountForCategory + amount > categorydata.categorylimit) {
      return res.status(400)
        .send(`You have exceeded the maximum expense limit for ${category}.<br>The Budget Limit for ${category} =${categorydata.categorylimit} Rs !<br>
                                     The Total Amount you have spent till now for ${category}=${totalAmountForCategory} Rs !<br>
                                     You can spend more ${balance} Rs for ${category}!`);
    }

    // If the total expenses do not exceed the limit, proceed with saving the new expense
    const data = {
      expense: req.body.expense,
      category: req.body.category,
      amount: req.body.amount,
      date: req.body.date,
      studentId: req.session.studentId,
    };

    const newExpense = new expensesmodel(data);
    await newExpense.save();

    res.redirect("/expenses");
  } catch (err) { 
    res.status(500).send("Internal Server Error");
  }
};

//viewing all expenses
module.exports.expensespage = async (req, res) => {
  try {
    const expensesdata = await expensesmodel.find({
      studentId: req.session.studentId,
    }); 
    res.render("expenses", { expensesdata });
  } catch (error) { 
    res.status(500).send("An error occurred while viewing expenses.");
  }
};

//viewing an expense
module.exports.viewpage = async (req, res) => {
  try {
    const expensedata = await expensesmodel.findOne({ _id: req.params.id });
    res.render("viewexpense", { expensedata });
  } catch (error) { 
    res.status(500).send("An error occurred while viewing expense.");
  }
};

//editing an expense
module.exports.editpage = async (req, res) => {
  try {
    const categorydata = await categorylimitmodel.find({
      studentId: req.session.studentId,
    });
    const expensedata = await expensesmodel.findOne({ _id: req.params.id });
    res.render("editexpense", { expensedata, categorydata });
  } catch (error) { 
    res.status(500).send("An error occurred while editing expense.");
  }
};

module.exports.posteditpage = async (req, res) => {
  try {
    const editedexpense = await expensesmodel.findByIdAndUpdate(req.params.id, {
      expense: req.body.expense,
      category: req.body.category,
      amount: req.body.amount,
      date: req.body.date,
      studentId: req.session.studentId,
    });
    await editedexpense.save();
    res.redirect("/expenses");
  } catch (error) { 
    res.status(500).send("An error occurred while editing expense.");
  }
};

//deleting an expense
module.exports.deletepage = async (req, res) => {
  try {
    const expensedata = await expensesmodel.findOne({ _id: req.params.id });
    res.render("deleteexpense", { expensedata });
  } catch (error) { 
    res.status(500).send("An error occurred while deleting expense");
  }
};
module.exports.postdeletepage = async (req, res) => {
  try {
    await expensesmodel.deleteOne({ _id: req.params.id });
    res.redirect("/expenses");
  } catch (error) { 
    res.status(500).send("An error occurred while deleting expense");
  }
};

//calendar view of expenses
module.exports.calendarpage = async (req, res) => {
  try {
    const expensessdata = await expensesmodel.find({
      studentId: req.session.studentId,
    });
    const expenses = [];
    expensessdata.forEach((element) => {
      expenses.push({
        title: element.expense,
        url: `/expenses/view/${element._id}`,
        start: element.date.toISOString().split("T")[0],
      });
    }); 
    res.render("calendarexpense", {
      layout: false,
      eventsJSON: JSON.stringify(expenses),
    });
  } catch (error) {
    // Handle the error here
    console.error("Error occurred while fetching assignment data:", error);
    res.status(500).send("An error occurred while fetching assignment data.");
  }
};

//searching the expense
module.exports.searchpage = async (req, res) => {
  const searchexpense = req.body.searchexpense;

  try {
    const searchexpensedata = await expensesmodel.find({
      studentId: req.session.studentId,
      $or: [{ category: { $regex: new RegExp(searchexpense, "i") } }],
    });
    res.render("searchexpense", { searchexpensedata });
  } catch (error) { 
    res.status(500).send("An error occurred while searching expense.");
  }
};
