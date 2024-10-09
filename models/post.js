import sequelize from "../config/database.js";
import { Sequelize,DataTypes, Model } from "sequelize";

class Post extends Model{}{

    Post.init({
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true
        },
        desc:{
            type:DataTypes.STRING,
        }
    },{
        sequelize,
        freezeTableName:true
    }
)}

// define comment model

class Comment extends Model{}{
    Comment.init({
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        },  
        postId:{
            type:DataTypes.INTEGER,
            references:{
                model:'Post', // name of the model 
                key:"id"
            },
            allowNull:false
        }
    },{
        sequelize,
        freezeTableName:true,
        modelName:'Comment',
    }
)}
// established  relationship
Post.hasMany(Comment,{foreignKey:'postId',onDelete:'CASCADE'});
Comment.belongsTo(Post,{foreignKey:'postId'});

export {Post,Comment};



