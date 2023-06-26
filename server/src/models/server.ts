import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProducto from '../routes/producto'; 
import db from '../db/connection';


class Server {
    private app: express.Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server is running on ${this.port}`);
        } )
    }

    routes(){
        this.app.get('/', (req: Request, res: Response) =>{
            res.json({
                msg: 'Api Working'
            })
        })
        this.app.use('/api/productos', routesProducto)
    }

    midlewares(){
        //pasamos el body
        this.app.use(express.json());

        this.app.use(cors());
    }

    async dbConnect(){
        await db.authenticate();
        console.log('Conectado a la base de datos');
    }

}

export default Server;