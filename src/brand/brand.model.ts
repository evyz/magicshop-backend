import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({tableName: "lzid-brands"})
export class BrandModel extends Model<BrandModel>{
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true , primaryKey: true})
    id: number;

    @Column({ type: DataType.STRING, unique: true})
    name: string;

    @Column({ type: DataType.STRING})
    country: string;

    @Column({ type: DataType.STRING})
    website: string;

    @Column({ type: DataType.STRING})
    logopath: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @Column({ type: DataType.BOOLEAN,  defaultValue: true})
    repaired: boolean;
}