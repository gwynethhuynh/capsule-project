import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "us-west-1"; //e.g. "us-east-2"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });
export { s3Client };