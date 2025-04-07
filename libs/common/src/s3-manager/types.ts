export interface S3ManagerServiceOptions {
  access: string;
  secret: string;
  bucketName: string;
  region?: string;
  isMinio?: boolean;
  endpoint?: `http://${string}` | `https://${string}`;
}
