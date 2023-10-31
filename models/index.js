const User = require('./User');
const Chatroom = require('./Chatroom');

// ONE TO MANY USER TO CHATROOM

User.hasMany(Chatroom, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE'
});

Chatroom.belongsTo(User, {
	foreignKey: 'user_id'
});


module.exports = { User, Chatroom };
