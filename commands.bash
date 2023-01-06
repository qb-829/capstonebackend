


sequelize model:create --name Users --attributes 'username:string email:string password:string'

npx sequelize-cli seed:generate --name user

npx sequelize-cli db:migrate