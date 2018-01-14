import * as mongoose from 'mongoose'
import * as path from 'path'
const mm = require('mongodb-migrations')

let _inmemoryURI
let _mongoServerInstance
( mongoose as any ).Promise = global.Promise

async function createInMemoryMongo(): Promise<any> {
  const MongoInMemory = require('mongo-in-memory')
  console.log('create inmemory mongo')
  if (_inmemoryURI) {
    console.log('uri exists')
    return _inmemoryURI
  }
  return new Promise((resolve, reject) => {
    _mongoServerInstance = new MongoInMemory(3391)
    console.log('start inmemory instance')
    _mongoServerInstance.start((error, mongoConfig) => {
      if (error) {
        console.error(error)
      } else {
        // callback when server has started successfully
        console.log('start db')
        console.log('HOST ' + mongoConfig.host)
        console.log('PORT ' + mongoConfig.port)
        _inmemoryURI = _mongoServerInstance.getMongouri(
          'wod-in-memory'
        )
        resolve(_inmemoryURI)
      }
    })
  })
}

interface DBConnectionContext {
  logger: Logger
  config: AppConfig
}
export default async function(
  context: DBConnectionContext
): Promise<mongoose.Connection> {
  if (context.config.isDev && !context.config.mongodbUrl) {
    context.logger.log('DB: MONGOD is not provide... use in-memory mongo')
    context.config.mongodbUrl = await createInMemoryMongo()
    context.logger.log(
      'DB: inmemory connection string ' + context.config.mongodbUrl
    )
  }

  /**
   * start migration service....
   * use connection string from above
   */
  const migrator = new mm.Migrator({
    url: context.config.mongodbUrl,
    collection: '_migration'
  })

  async function startMigrate() {
    return new Promise((resolve, reject) => {
      context.logger.log('DB: start migrate...')
      migrator.runFromDir(path.join(__dirname, '../migrations'), function(
        error,
        result
      ) {
        if (error) {
          reject(error)
        }
        context.logger.log(`🕺🏼 migrate complete !`)
        resolve(result)
      })
    })
  }

  console.log(await startMigrate())

  return new Promise<mongoose.Connection>((resolve, reject) => {
    context.logger.log('DB: connect to database...' + context.config.mongodbUrl)

    // tslint:disable-next-line
    const __connection = mongoose.createConnection(context.config.mongodbUrl, {
      promiseLibrary: global.Promise,
      useMongoClient: true,
      poolSize: 2
    })
    __connection.on('disconnected', () => {
      context.logger.log(`👊🏽  Disconnected`)

      // close inmemoery if exists
      if (_mongoServerInstance) {
        _mongoServerInstance.stop()
      }
    })

    __connection.on('reconnect', () => {
      context.logger.log(`😧  Reconnect......`)
    })

    __connection.on('connected', () => {
      context.logger.log(`🖥  Connected.... `)
      resolve(__connection)
    })
    const closeConnection = () => {
      context.logger.log('try to close connection...')
      // __connection.close(() => {
      //   console.log('Mongoose disconnected on app termination')
      //   process.exit(0)
      // })
    }
    // process.on('SIGINT', closeConnection)
    // process.on('SIGUSR2', closeConnection)
    // process.on('SIGTERM', closeConnection)
  })
}