import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres://vjhgidsv:zojMpMhAcp0IK3lsUdQdvFjTY32NDjZi@chunee.db.elephantsql.com/vjhgidsv',
  {
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  }
);

export default sequelize;
