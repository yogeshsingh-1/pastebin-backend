"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const Paste = sequelize.define("Paste", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        slug: { type: sequelize_1.DataTypes.STRING(10), allowNull: false, unique: true },
        content: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        viewcount: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        },
        max_views: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        expiresAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: "pastes",
        timestamps: true,
    });
    return Paste;
};
