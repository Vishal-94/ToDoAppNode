var express = require('express');
var router = express.Router();

router.get("/todolist", async (req, res) => {
  const todolistRecords = await req.db.collection("todocollection").find({}).toArray();
  return res.json({ success: true, msg: "Todo List Records", data: todolistRecords });
});

router.post("/createToDo", async (req, res) => {
  try {
    const newTask = req.body;
    const inserted = await req.db.collection("todocollection").insertOne(newTask);
    return res.json({ success: true, msg: "To do task created successfully", data: inserted });
  } catch (error) {
    return res.json({ success: false, msg: error.message, data: null });
  }
});

router.post("/deleteTask", async (req, res) => {
  try {
    const deleteTask = req.body;
    const deleted = await req.db.collection("todocollection").deleteOne(deleteTask);
    return res.json({ success: true, msg: "To do task deleted successfully", data: deleted });
  } catch (error) {
    return res.json({ success: false, msg: error.message, data: null });
  }
});


router.put("/updatetodo", async (req, res) => {
  try {
    const description = req.body.description;
    const status =  req.body.status;
    const title = req.body.title;
    const updated = await req.db.collection("todocollection").updateOne({title: title}, { $set: { status: status , description :description} })
    return res.json({ success: true, msg: "To do task updated successfully", data: updated });
  } catch (error) {
    return res.json({ success: false, msg: error.message, data: null });
  }
});

module.exports = router;
