const AuthService = require('../services/auth')

class UserController {
  async show(req, res) {
    const { id } = req.params
    const response = await AuthService.get({ id })

    return res.json(response)
  }

  async store(req, res) {
    console.log(req.body)
    const response = await AuthService.store(req.body)
    return res.json(response)
  }

  async list(req, res) {
    const response = await AuthService.list(req.body)
    return res.json(response)
  }
}

module.exports = new UserController()
