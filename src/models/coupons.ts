import { sequelize, DataTypes } from '../connection/database'
import { Model } from 'sequelize'


export class Coupon extends Model{
    public id!: number
    public code!: string
    public discountType!: string
    public discountAmount!: string
   
}

Coupon.init( {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: new DataTypes.STRING(32),
        allowNull: false,
    },
    discountType: {
        type: new DataTypes.STRING(),
        allowNull: false,
    },
    discountAmount: {
        type: DataTypes.INTEGER(),
    }
}, {
    
        sequelize,
        tableName: 'coupons',
        timestamps: true,
    
})
