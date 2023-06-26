import { Request, Response } from 'express';
import Producto from '../models/producto';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Producto.findAll()
    res.json(listProducts)
}

export const getProduct =async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = await Producto.findByPk(id);

        if(product){
            res.json(product);
        } 
        else{
            res.status(404).json({
                msg:'no existe el producto'
            })
        }
    
}

export const deleteProduct =  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if(!product){
        res.status(404).json({
            msg:"producto no encontrado"
        })
    }
    else{
        await product.destroy()
        res.json({
            msg:`el producto ${id} fue eliminado`
        })
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;
    await Producto.create(body);

    res.json({
        msg : "Producto creado",
        body
    })
}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const product = await Producto.findByPk(id);
    
    if(product){
        await product.update(body);
        res.json({
            msg : `El producto con ID ${id} ha sido modificado`,
            body
        })
    }
    else{
        res.json({
            msg :"No se encontro el producto a actualizar"
        })
    }
}



