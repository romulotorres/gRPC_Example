# gRPC-Example

Example of gRPC implementation with a API node.js express accessing a Micro Service Auth over gRPC

## Instructions:

clone the repo

### AuthService:

From root

- cd AuthService
- mv settings_sample.json settings.json
- Edit settings.json with your connection string. You can use a docker, MongoAtlas or another instance of MongoDB
- yarn install
- yarn dev

## Api

From root

- cd api
- yarn install
- yarn dev

## Using!

- Try send a request to POST:localhost:3333/users with json body: {name: 'John Doe', email john@doe.com, password: '123456'}
- Try send a request to GET:localhost:3333/users

See the auth.proto to others options
