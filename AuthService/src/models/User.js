const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require('settings.json')

mongoose.set('useCreateIndex', true)

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome do usuário é requerido!']
  },
  email: {
    type: String,
    required: [true, 'O email do usuário é requerido!'],
    unique: true,
    validate: {
      validator: function(v) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(v)
      },
      message: 'O email informado não é válido'
    }
  },
  password: {
    type: String,
    required: [true, 'A senha do usuário é requerida!']
  }
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password)
  }
}

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
