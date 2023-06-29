import { Model ,DataTypes } from 'sequelize';

// Define the "users" table model
export class UserModel extends Model {

  static load(sequelize) {
    UserModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: true
      }
    );
  }
};
