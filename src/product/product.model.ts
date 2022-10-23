import { Column,Model, DataType, Table } from "sequelize-typescript";


@Table({tableName: "lzid-products"})
export class ProductModel extends Model<ProductModel>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true , primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING})
    desc: string;
}