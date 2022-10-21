import { Table,Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { RoleModel } from "src/roles/roles.models";
import { UserRoleModel } from "src/roles/user-roles.models";

interface UserCreationAttrs{
    name: string;
    email: string;
    password: string;
}

@Table({tableName: "lzid-users"})
export class UserModel extends Model<UserModel, UserCreationAttrs >{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true , primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
    banned: boolean;

    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles: RoleModel[]
}