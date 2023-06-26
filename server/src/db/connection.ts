import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('crud_front', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;