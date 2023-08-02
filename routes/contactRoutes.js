const  express =  require("express");
const router = express.Router();
const ContactCtrl = require("../controllers/contactControl");

router.get("/", ContactCtrl.getAllContacts);

router.get("/contact/add", (req, res) => {
    res.render('add_contact', {title : 'Add Contact'})
})
router.post("/contact/add", ContactCtrl.createContact);
router.get("/contact/:id", ContactCtrl.getContact);
router.patch("/contact/:id", ContactCtrl.updateContact);
router.delete("/contact/:id", ContactCtrl.deleteContact);

module.exports =  router;