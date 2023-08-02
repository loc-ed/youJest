const  express =  require("express");
const router = express.Router();
const ClientCtrl = require("../controllers/clientControl");


router.get("/", ClientCtrl.getAllClients);

router.get("/client/add", (req, res) => {
    res.render('add_client', {title : 'Add Clients'})
})
router.post("/client/add", ClientCtrl.createClient);
router.get("/client/:name", ClientCtrl.getClient);
router.patch("/client/:id", ClientCtrl.updateClient);
router.delete("/client/:id", ClientCtrl.deleteClient);

module.exports =  router;