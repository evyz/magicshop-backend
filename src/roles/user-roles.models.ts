import {Table, Model, Column, DataType, ForeignKey} from 'sequelize-typescript'
import { UserModel } from 'src/user/user.models';
import { RoleModel } from './roles.models';

@Table({tableName: "lzid-user-roles", createdAt:false, updatedAt:false})
export class UserRoleModel extends Model<UserRoleModel>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true , primaryKey: true})
    id: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => RoleModel)
    @Column({ type: DataType.INTEGER})
    roleId: number;
}