import {app} from './conf.js'
import { Sequelize } from 'sequelize';
import {loadModels} from './models_/index.js';
const sequelize = new Sequelize('node_users', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

loadModels(sequelize)
  
  
// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables created!');
  })
  .catch((error) => {
    console.error('Unable to create database and tables:', error);
  });

  app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
      