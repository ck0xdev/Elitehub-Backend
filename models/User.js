const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Optional for now
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // 'user' or 'admin'
  addresses: { type: [mongoose.Schema.Types.Mixed], default: [] },
}, { timestamps: true });

// Virtual 'id' field to make Frontend life easier
const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id; delete ret.password; }
});

// Password Hash Middleware (Automatic Security)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Helper to check password
userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);