import { Optional, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize, Association } from 'sequelize';
import { TodoItem } from './todoitem.model';

/**
 * TODO: Add description
 *
 */

export interface TodoListAttributes {
    todoListId: number;
    name: string;
}

export interface TodoListCreationAttributes extends Optional<TodoListAttributes, 'todoListId'> { }

export class TodoList extends Model<TodoListAttributes, TodoListCreationAttributes> implements TodoListAttributes {

    /**
     * TODO: Add method description
     *
     */

    public static associations: {
        todoItems: Association<TodoList, TodoItem>;
    };
    todoListId!: number;
    name!: string;

    public getTodoItems!: HasManyGetAssociationsMixin<TodoItem>;
    public addItem!: HasManyAddAssociationMixin<TodoItem, number>;

    public readonly todoItems?: TodoItem[];

    /**
     * TODO: Add method description
     *
     * @param sequelize
     */

    public static initialize(sequelize: Sequelize) {
        TodoList.init(
            {
                todoListId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            { tableName: 'todolists', sequelize }
        );
    }

    /**
     * Todo: Add description
     *
     */

    public static createAssociations() {
        TodoList.hasMany(TodoItem, {
            as: 'todoItems',
            foreignKey: 'todoListId'
        });
    }
}
