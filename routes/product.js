const express =require ("express");
const {addProduct, getAllProduct, deleteProduct, editProduct, getCANProducts, getBUFProducts, getTABProducts, getCHProducts} =require("../controllers/product.Controler");
const isAdmin = require("../middlewares/isAdmin");

const router= express.Router();
// add product
router.post('/addProd',isAdmin,addProduct);
// get all products
router.get('/getAllProd',isAdmin,getAllProduct);
// delete product
router.delete("/deleteProduct/:_id",isAdmin, deleteProduct);
// editproduct
router.put("/editProduct/:_id",isAdmin,editProduct);
// get chaises products
router.get('/getCHAISES',getCHProducts);
// get TABLES products
router.get('/getTABLES',getTABProducts);
// get CANAPE products
router.get('/getCANAPES',getCANProducts);
// get BUFFET products
router.get('/getBUFFETS',getBUFProducts);

module.exports = router