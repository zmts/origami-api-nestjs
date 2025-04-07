import { Readable } from 'stream';

import { DeleteObjectCommand, DeleteObjectsCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { MODULE_OPTIONS_TOKEN } from './token';
import { S3ManagerServiceOptions } from './types';

@Injectable()
export class S3ManagerService {
  private logger: Logger = new Logger(this.constructor.name);
  private client: S3Client;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly options: S3ManagerServiceOptions) {
    if (options.isMinio && !options.endpoint) {
      throw new Error('endpoint option is required');
    }

    this.client = new S3Client({
      credentials: {
        accessKeyId: this.options.access,
        secretAccessKey: this.options.secret,
      },
      region: this.options?.region || 'us-east-1',
      ...(options.isMinio && { endpoint: options.endpoint, forcePathStyle: true }),
    });
  }

  private get bucketName(): string {
    return this.options.bucketName;
  }

  async uploadFile({
    buffer,
    fileName,
    mimetype = 'application/octet-stream',
  }: {
    buffer: Buffer;
    fileName: string;
    mimetype?: string;
  }): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: mimetype,
    });

    try {
      await this.client.send(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }

    return fileName;
  }

  async removeFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.client.send(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async batchRemove(keys: string[]): Promise<void> {
    if (keys.length === 0) return;

    const command = new DeleteObjectsCommand({
      Bucket: this.bucketName,
      Delete: {
        Objects: keys.map(key => ({ Key: key })),
        Quiet: true,
      },
    });

    try {
      await this.client.send(command);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getFileAsStream(key: string): Promise<{ stream: Readable; contentType: string }> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.client.send(command);

    return {
      stream: response.Body as Readable,
      contentType: response.ContentType || 'application/octet-stream',
    };
  }
}
