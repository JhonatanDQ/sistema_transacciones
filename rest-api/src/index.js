import app from './app.js';
import { sequelize } from './database/database.js';

import './models/User.js';


 async function main (){
    try {
       await sequelize.sync({force:false}) 
        app.listen(4000)
        console.log('running on port', 4000)
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main ();
