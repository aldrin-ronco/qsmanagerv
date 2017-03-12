import AWS from 'aws-sdk'
import path from 'path'

const config = {
  baseUrl  : 'https://qsmanager-api.herokuapp.com',
  s3Config: {
    bucketCompanyLogosName: 'qs.company.logos',
    bucketCompanyLogosRegion: 'us-west-2',
    IdentityPoolId: 'us-west-2:b037283a-c604-417e-ae5a-795ecefe6a73',
    bucketCompanyLogosFolder: 'logos'
  },
  s3 () {
    AWS.config.update({
      region: this.s3Config.bucketCompanyLogosRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.s3Config.IdentityPoolId
      })
    })
    return new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this.s3Config.bucketCompanyLogosName }
    })
  }
}

export default config;
