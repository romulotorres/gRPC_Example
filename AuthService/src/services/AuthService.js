const jwt = require('jsonwebtoken')
const User = require('src/models/User')
const { promisify } = require('util')
const { JWT_SECRET } = require('settings.json')

module.exports = {
  /* Mátodos de CRUD de Usuários
   ************************************************************************* */
  async get(call, callback) {
    const { id } = call.request

    const user = await User.findById(id)
    console.log(user)

    if (!user) {
      return callback(null, { error: 'User not found' })
    }
    return callback(null, user)
  },

  async list(call, callback) {
    const list = await User.find()
    const count = await User.count()
    return callback(null, { list, count })
  },

  async store(call, callback) {
    const { email, name, password } = call.request

    const UserExists = await User.findOne({ email })
    if (UserExists) {
      return callback(null, { error: 'User not found' })
    }

    const user = await User.create({ email, name, password })
    return callback(null, user)
  },

  // async update(req, res, next) {
  //   try {
  //     const data = req.body
  //     if (data.password) {
  //       data.password = bcrypt.hashSync(data.password, salt)
  //     }
  //     const User = await User.findOneAndUpdate({ _id: req.params.id }, data, { new: true }, function(err, doc) {
  //       if (err) return next(err)
  //     })
  //     if (!User) return next('Registro não encontrado')
  //     const { password, ...UserWithoutPassword } = User._doc
  //     return res.send(UserWithoutPassword)
  //   } catch (error) {
  //     return next(error)
  //   }
  // },

  // async list(req, res) {
  //   const Users = await User.find().select('-password')
  //   return res.json(Users)
  // },

  // async delete(req, res, next) {
  //   try {
  //     await User.deleteOne({ _id: req.params.id }, function(err, data) {
  //       if (err) return next(err)
  //       if (data.deletedCount == 0) return next('Registro não localizado!')
  //     })
  //     return res.json({ message: 'Registro excluído com sucesso!' })
  //   } catch (error) {
  //     return next(error)
  //   }
  // }

  /* Mátodos Autenticação e validação JWT
   ************************************************************************* */
  async authenticate(call, callback) {
    const { email, password } = call.request.user

    const user = await User.findOne({ email })

    if (!user) {
      return callback(null, { error: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return callback(null, { error: 'Invalid password' })
    }

    const token = User.generateToken(user)

    return callback(null, {
      token
    })
  },

  async validate(call, callback) {
    const { token: fullToken } = call.request

    if (!fullToken) {
      callback(null, { error: 'No token provided' })
    }

    const parts = fullToken.split(' ')

    if (!parts.length === 2) {
      return callback(null, { error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return callback(null, { error: 'Token malformatted' })
    }

    try {
      const decoded = await promisify(jwt.verify)(token, JWT_SECRET)
      const user = await User.findById(decoded.id)

      return callback(null, { user: { ...user.toObject(), id: user._id } })
    } catch (err) {
      return callback(null, { error: 'Token invalid' })
    }
  }
}
