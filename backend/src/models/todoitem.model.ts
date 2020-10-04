import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { TodoList } from './todolist.model';

/**
 * TODO: add description
 *
 */

export interface TodoItemAttributes {
    todoItemId: number;
    name: string;
    done: boolean;
    todoListId: number;
}

// tells sequelize that todoItemId is not a required field
export interface TodoItemCreationAttributes extends Optional<TodoItem, 'todoItemId'> { }


export class TodoItem extends Model<TodoItemAttributes, TodoItemCreationAttributes> implements TodoItemAttributes {
    todoItemId!: number;
    name!: string;
    done!: boolean;
    todoListId!: number;

    /**
     * TODO: add method description
     * @param sequelize
     */

    public static initialize(sequelize: Sequelize) { // definition for database
        TodoItem.init({
            todoItemId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            todoListId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { sequelize, tableName: 'todoItems' }
        );

    }

    /**
     * TODO: add method description
     *
     */

    public static createAssociations() {
        TodoItem.belongsTo(TodoList, {
            targetKey: 'todoListId',
            as: 'todoList',
            onDelete: 'cascade',
            foreignKey: 'todoListId'
        });
    }

}
