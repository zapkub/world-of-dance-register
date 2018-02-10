import logger from '../utils/Logger'
import * as mongoose from 'mongoose'
import * as path from 'path'
import { GQC, TypeComposer } from 'graphql-compose'
import composeWithMongoose from 'graphql-compose-mongoose'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { wrapResolvers } from 'graphql-compose-schema-wrapper'

import AuditionInformationStrategy from './AuditionInformation'
import UserStrategy from './User'
/**
 * Development disposer for lazy
 * UI require with no app restart
 */

declare global {
  namespace GraphQL {
    /**
     * ADD YOUR DATA TYPE HERE
     */
    interface ModelWithTimeStamp {
      createdAt?: string
      updatedAt?: string
    }
    interface TypeComposers {
      User: TypeComposer
      AuditionInformation: TypeComposer
    }
    interface Models {
      User: mongoose.Model<UserDocument>
      AuditionInformation: mongoose.Model<AuditionInformationDocument>
    }

    interface Context {
      connection: mongoose.Connection
      logger: Logger
      config: AppConfig
      models?: Models
      user?: User
    }
    interface ComposerStrategy<T extends mongoose.Document> {
      schema: mongoose.Schema
      createTypeComposer: (
        Model: mongoose.Model<T>,
        context: Context
      ) => TypeComposer
      createGraphQLRelation?: (
        typeComposers: TypeComposers,
        context: Context
      ) => void
    }
    interface Connection<T> {
      pageInfo: {
        startCursor: string
        endCursor: string
        hasNextPage: boolean
        hasPreviousPage: boolean
      }
      edges: {
        cursor: string
        node: T
      }[]
    }
  }
}

interface InitContext {
  connection: mongoose.Connection
  logger: Logger
  config: AppConfig
}
export default function createGraphQLSchema(context: InitContext) {
  // Create model from mongoose connection
  context.logger.log('GraphQL: create models...')
  const strategies = {}
  const models = {
    User: context.connection.model<UserDocument>('User', UserStrategy.schema),
    AuditionInformation: context.connection.model<AuditionInformationDocument>(
      'AuditionInformation',
      AuditionInformationStrategy.schema
    )
  }

  /**
   * Create GraphQL Typecomposer
   */
  context.logger.log('GraphQL: create type composers...')
  const GraphQLContext = {
    ...context,
    models
  }
  const typeComposers: GraphQL.TypeComposers = {
    User: UserStrategy.createTypeComposer(models.User, context),
    AuditionInformation: AuditionInformationStrategy.createTypeComposer(
      models.AuditionInformation,
      context
    )
  }

  // create relation
  Object.keys(strategies).forEach(key => {
    if (strategies[key].createGraphQLRelation) {
      strategies[key].createGraphQLRelation(typeComposers, context)
    }
  })

  /**
   *  build schema
   */
  function requireSessionWrapper(next) {
    return rp => {
      if (rp.context.user) {
        return next(rp)
      } else {
        throw new Error('unauthorized (session not found)')
      }
    }
  }
  function requireAdminWrapper(next) {
    return rp => {
      if (rp.context.user) {
        console.log(rp.context.user)
        if (rp.context.user.role === 'ADMIN') {
          return next(rp)
        } else {
          throw new Error('unauthorized (permission denial)')
        }
      } else {
        throw new Error('unauthorized (session not found)')
      }
    }
  }
  GQC.rootQuery().addFields(
    wrapResolvers(
      {
        me: typeComposers.User.getResolver('getUserProfile'),
        auditionInfo: typeComposers.AuditionInformation.getResolver('findOne')
      },
      requireSessionWrapper
    )
  )
  GQC.rootQuery().addFields(
    wrapResolvers(
      {
        auditionInfoList: typeComposers.AuditionInformation.getResolver(
          'findMany'
        )
      },
      requireAdminWrapper
    )
  )
  GQC.rootMutation().addFields(
    wrapResolvers(
      {
        updateAuditionInfo: typeComposers.AuditionInformation.getResolver(
          'updateOne'
        )
      },
      requireSessionWrapper
    )
  )

  // GQC.rootMutation().addFields(
  //   wrapResolvers(
  //     {
  //       archive: typeComposers.AuditionInformation.getResolver('archiveOne')
  //     },
  //     requireAdminWrapper
  //   )
  // )

  return {
    models,
    graphiqlHandler: graphiqlExpress({ endpointURL: '/graphql' }),
    graphqlHandler: graphqlExpress(async req => ({
      schema: GQC.buildSchema(),
      context: {
        ...req,
        ...GraphQLContext
      }
      // formatError: (error) => {
      //   console.log('error occurs')
      //   return {
      //     error: 'there is error'
      //   }
      // }
    }))
  }
}
