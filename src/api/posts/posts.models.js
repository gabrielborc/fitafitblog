import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
    class Post extends Model {}
    Post.init({
        title: dataTypes.STRING,
        content: dataTypes.TEXT
    }, { sequelize , modelName: 'Post' });

    Post.associate = models => {
        models.Post.hasMany(models.Tag, { as: "tags", foreignKey: "postId" });
    }

    return Post;
};