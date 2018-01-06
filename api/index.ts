import connectToDatabase from '../utils/db.connection'
import * as mongoose from 'mongoose'
import logger from '../utils/Logger'
import config from '../config'
import enhanceAuthentication from './authentication'
import enhanceUploadAPI from './upload'
import createGraphQL from './graphql'

declare global {
  interface Models {
    User: mongoose.Model<UserDocument>
  }
  interface APIContext {
    logger: Logger
    config: AppConfig
    connection: any
    models: Models
  }
}

export async function prepare(app: any) {
  const connection = await connectToDatabase({
    logger,
    config
  })


 
  const  { graphiqlHandler,models, graphqlHandler } = createGraphQL({
    connection,
    logger,
    config,
  })
 const context = {
    logger,
    config,
    connection,
    models
  }
  enhanceAuthentication(app, context)
  enhanceUploadAPI(app, context)
  app.all('/graphql', graphqlHandler)
  app.get('/graphiql', graphiqlHandler)
}




