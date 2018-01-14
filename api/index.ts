import connectToDatabase from '../utils/db.connection'
import * as mongoose from 'mongoose'
import logger from '../utils/Logger'
import config from '../config'
import enhanceAuthentication from './authentication'
import enhanceUploadAPI from './upload'
import createGraphQL from './graphql'
import enhancePdfAPI from './pdf-generate'

declare global {
  interface APIContext {
    logger: Logger
    config: AppConfig
    connection: any
    models: GraphQL.Models
  }
}

export async function prepare(app: any) {
  const connection = await connectToDatabase({
    logger,
    config
  })

  const { graphiqlHandler, models, graphqlHandler } = createGraphQL({
    connection,
    logger,
    config
  })
  const context = {
    logger,
    config,
    connection,
    models
  }
  enhanceAuthentication(app, context)
  enhanceUploadAPI(app, context)
  enhancePdfAPI(app, context)

  app.all('/graphql', graphqlHandler)
  app.get('/graphiql', graphiqlHandler)
}
