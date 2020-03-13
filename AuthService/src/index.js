require('rootpath')()

const path = require('path')
const grpc = require('grpc')
const config = require('settings.json')
const protoConfig = require('src/config/proto')
const protoLoader = require('@grpc/proto-loader')
const authService = require('src/services/AuthService')

require('src/config/database')

const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, 'pb', 'auth.proto'), protoConfig)
const proto = grpc.loadPackageDefinition(packageDefinition)
const server = new grpc.Server()

server.addService(proto.AuthService.service, authService)
server.bind(`${config.LOCAL_URL}:${config.LOCAL_PORT}`, grpc.ServerCredentials.createInsecure())
server.start()
