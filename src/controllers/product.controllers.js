const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const {category} = req.query // si req trae el parámetro category, lo desestructuro para usarlo
    const where = {} // creo una variable objeto tipo const para guardar la categoría, si esta existiera en el req (en lugar de where se puede llamar whereCategoryId)
    if(category) where.categoryId = category //entonces si existe la category (filtro de prod por categories) lo guardo en el objeto where

    const results = await Product.findAll({
        include:[Category, ProductImg], // se mostrarán la categoría y la imagen del producto
        where // where : {where}, si el objeto where contiene la key categoryId, entonces filtra por categoria
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id,{include:[Category,ProductImg]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});


const setImages = catchError(async(req,res)=>{
    const {id} = req.params //products/:id/images
    const product = await Product.findByPk(id)
    await product.setProductImgs(req.body)
    const images = await product.getProductImgs()
    return res.json(images)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setImages
}