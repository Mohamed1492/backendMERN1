const product = require("../models/product");

exports.addProduct= async(req,res)=>{
    const {nameProd,category,image,rented,quantity,date}= req.body;
    try {
        // add new product
        const newProduct = new product({
            nameProd,
            category,
            image,
            rented,
            quantity,
            date,
        });
        await newProduct.save();
        newProduct? res.status(200).json(newProduct): res.status(401).json({ msg: "you had an error during creating product" });
    } catch (error) {
        res.status(500).json({msg:error.message})
}};

exports.getAllProduct=async(req,res)=>{
    try {
        const allProducts= await product.find();
        allProducts? res.status(201).json(allProducts): res.status(401).json({msg:"got an error while finding allproducts "});
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
};

exports.deleteProduct= async(req,res)=>{

    try {
        
        const deleteProduct= await product.findByIdAndDelete(req.params._id);
        deleteProduct?res.status(201).json({msg:"product deleted successfully"}):res.status(401).json({msg:"can't be deleted"});
    } 
    catch (error) {
        res.status(500).json({msg:error.message})
}
};

exports.editProduct= async(req,res)=>{
    try {
        
        const editProduct= await product.findByIdAndUpdate(req.params._id,{...req.body});
        res.status(201).send(editProduct)
    } 
    catch (error) {
        res.status(500).json({msg:error.message})
}
};

///////get product CHAISE

exports.getCHProducts = async (req, res) => {
    try {
      const getCHProducts = await product.find({category:"CH"});
      getCHProducts
        ? res.status(201).json(getCHProducts)
        : res.status(401).json({ msg: "got an error while finding chaises" });
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  };

///////get product TABLES

exports.getTABProducts = async (req, res) => {
    try {
      const getTABProducts = await product.find({category:"TAB"});
      getTABProducts
        ? res.status(201).json(getTABProducts)
        : res.status(401).json({ msg: "got an error while finding tables" });
        console.log(getTABProducts)
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  };

  ///////get product CANAPES

exports.getCANProducts = async (req, res) => {
    try {
      const getCANProducts = await product.find({category:"CAN"});
      getCANProducts
        ? res.status(201).json(getCANProducts)
        : res.status(401).json({ msg: "got an error while finding Canapes" });
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  };


   ///////get product BUFFETS

exports.getBUFProducts = async (req, res) => {
    try {
      const getBUFProducts = await product.find({category:"BUF"});
      getBUFProducts
        ? res.status(201).json(getBUFProducts)
        : res.status(401).json({ msg: "got an error while finding Buffets" });
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  };