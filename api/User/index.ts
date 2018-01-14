import schema from './User.schema'
import composeWithMongoose from 'graphql-compose-mongoose'
import * as mongoose from 'mongoose'
import TypeComposer from 'graphql-compose/lib/typeComposer'

export default {
  schema,
  createTypeComposer: (model: mongoose.Model<UserDocument>) => {
    const TC = composeWithMongoose(model) as TypeComposer
    TC.removeField('password')
    TC.removeField('role')
    TC.addResolver({
      name: 'getUserProfile',
      type: TC,
      resolve: async (rp) => {
        const { context } = rp 
        const { _id } = context.user
        rp.args._id = _id
        const user =  await TC.getResolver('findById').resolve(rp)
        return user
      }
    })
    return TC
  }
} as GraphQL.ComposerStrategy<UserDocument>
