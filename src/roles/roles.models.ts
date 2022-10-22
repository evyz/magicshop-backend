import {Table, Model, Column, DataType, BelongsToMany} from 'sequelize-typescript'
import { UserModel } from 'src/user/user.models';
import { UserRoleModel } from './user-roles.models';

interface RoleAttrs{
    name: string;
    code: string;
}

@Table({tableName: "lzid-roles"})
export class RoleModel extends Model<RoleModel, RoleAttrs>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true , primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING})
    name: string;
    
    @Column({ type: DataType.STRING, unique: true})
    code: string;

    @BelongsToMany(() => UserModel, () => UserRoleModel)
    users: UserModel[]
}