import express, { Application , Request, Response } from 'express';
import morgan from 'morgan';
import { TodoItemController } from './controllers/todoitem.controller';
import { TodoListController } from './controllers/todolist.controller';
import { UserController } from './controllers/user.controller';
import { SecuredController } from './controllers/secured.controller';
import { Sequelize } from 'sequelize';
import { TodoList } from './models/todolist.model';
import { TodoItem } from './models/todoitem.model';
import { User } from './models/user.model';

import cors from 'cors';

/** Here to implement our Express code
   Middlewares is a method which is invoked if u want to own a request (e.g. secured.controller.ts)
   HTTP database logic: services
   jason formatting to return
   todolist add ->
   Promis? Promess?
   complicated requests user.controller.ts
   -> login requests checking password
   -> user.service.ts find user, find matches password (if hash finds result, promise is resolved)
   secure.controller.ts verify the tokens
*/

/**
 * TODO: add description
 *
 */

export class Server {
    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    /**
     * TODO: add construction function
     */

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();

        TodoItem.initialize(this.sequelize); // creates the tables if they dont exist
        TodoList.initialize(this.sequelize);
        TodoItem.createAssociations();
        TodoList.createAssociations();
        User.initialize(this.sequelize);

        this.sequelize.sync({alter: true}).then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });
    }

    /**
     * TODO: add method description
     *
     * @private
     */

    private configureServer(): Application {
        // options for cors middleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
            .use(cors())
            .use(express.json())                    // parses an incoming json to an object
            .use(morgan('tiny'))                    // logs incoming requests
            .use('/todoitem', TodoItemController)   // any request on this path is forwarded to the TodoItemController
            .use('/todolist', TodoListController)
            .use('/user', UserController)
            .use('/secured', SecuredController)
            .options('*', cors(options))
            .use(express.static('./src/public'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2020 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }

    /**
     * TODO: add method description
     * @private
     */

    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false // can be set to true for debugging
        });
    }
}

const server = new Server(); // starts the server
