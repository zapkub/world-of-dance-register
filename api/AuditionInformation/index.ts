import schema from './AuditionInformation.schema'
import * as moment from 'moment'
import composeWithMongoose from 'graphql-compose-mongoose'
import TypeComposer from 'graphql-compose/lib/TypeComposer'
import { GraphQLDate } from 'graphql-compose'
import { Types } from 'mongoose'
import validator from './validator'

export default {
  schema,
  createTypeComposer: model => {
    const TC = composeWithMongoose(model) as TypeComposer
    const memberTC = TC.getFieldTC('members')
    // memberTC.extendField('dateOfBirth', {
    //   type: 'String',
    //   description: '',
    //   resolve: source => {
    //     console.log(source)
    //     return moment(source.dateOfBirth).format('dd/mm/yyyy')
    //   }
    // })

   
    TC.wrapResolverResolve('findOne', next => async rp => {
      const { context } = rp
      rp.args.filter.ownerId = context.user._id
      rp.projection.ownerId = true

      if (!rp.args.filter.ownerId) {
        const e = new Error()
        e.message = 'no session found...'
        e.name = 'owner-id-error'
        throw e
      }
      const result = await next(rp)
      if (!result) {
        return undefined
      }
      if (result.ownerId.toString() === context.user._id.toString())
        return result
      else {
        console.log('error invalid ownerId access', context.user._id)
        return undefined
      }
    })
    TC.getResolver('findOne')
      .getArgTC('filter')
      .removeOtherFields(['auditionType'])
    TC.getResolver('findOne')
      .getArgTC('filter')
      .makeRequired('auditionType')
    TC.getResolver('findOne').makeRequired('filter')
    TC.getResolver('findOne').removeOtherArgs('filter')

    TC.wrapResolverResolve('updateOne', next => async rp => {
      /**
       * Find document of type from user
       */
      if (!rp.args.filter) {
        rp.args.filter = {}
      }

      delete rp.args.record.videoURL
      rp.args.filter.auditionType = rp.args.record.auditionType
      rp.args.filter.ownerId = rp.context.user._id
      const auditionInfo = await model.findOne(rp.args.filter)
      if (rp.args.record.isConfirm) {
        /**
         * Validate form
         */
        console.log('AuditionForm: Validate ', rp.context.user._id)
        rp.args.record.videoURL = auditionInfo.videoURL
        rp.args.record.confirmAt = new Date()
        validator(rp.args.record)
      }
      if (!auditionInfo) {
        const result = await model.create({
          ...rp.args.record,
          ownerId: rp.context.user._id
        })
        return next(rp)
      } else {
        return next(rp)
      }
    })
    const updateOne = TC.getResolver('updateOne')
    updateOne.removeOtherArgs(['filter', 'record'])
    updateOne.getArgTC('record').removeField('ownerId')
    updateOne.getArgTC('record').removeField('videoURL')
    updateOne.getArgTC('record').removeField('confirmAt')

    // TC.getResolver('findOne').addSortArg({
    //   name: 'CREATED_AT_DESC',
    //   sortTypeNameFallback: '__DATE',
    //   value: { createdAt: 1, confirmAt: 1 }
    // })

    return TC
  }
} as GraphQL.ComposerStrategy<AuditionInformationDocument>
