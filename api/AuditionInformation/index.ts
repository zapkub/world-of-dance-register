import schema from './AuditionInformation.schema'
import composeWithMongoose from 'graphql-compose-mongoose'
import TypeComposer from 'graphql-compose/lib/typeComposer'
import { Types } from 'mongoose'
import validator from './validator';

export default {
  schema,
  createTypeComposer: model => {
    const TC = composeWithMongoose(model) as TypeComposer
    TC.wrapResolverResolve('findOne', next => rp => {
      const { context } = rp
      rp.args.filter.ownerId = context.user._id
      return next(rp)
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
      if(!rp.args.filter) {
        rp.args.filter = {}
      }

      delete rp.args.record.videoURL
      rp.args.filter.auditionType = rp.args.record.auditionType
      const auditionInfo = await model.findOne({
        ownerId: rp.context.user._id,
        auditionType: rp.args.record.auditionType
      })
      if(rp.args.record.isConfirm) {
        /**
         * Validate form
         */
        console.log('AuditionForm: Validate ', rp.context.user._id)
        rp.args.record.videoURL = auditionInfo.videoURL
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
    updateOne.removeOtherArgs(['filter','record'])
    updateOne.getArgTC('record').removeField('ownerId')
    updateOne.getArgTC('record').removeField('videoURL')
    return TC
  }
} as GraphQL.ComposerStrategy<AuditionInformationDocument>
