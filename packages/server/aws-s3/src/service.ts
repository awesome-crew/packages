import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { ReadStream } from 'fs-capacitor';
import dayjs from 'dayjs';

import { S3Config } from './config';

const MAX_DELETE_SIZE = 1000;

export type S3UploadResult = {
  key: string;
  url: string;
};

@Injectable()
export class AwsS3Service {
  private ACL = ObjectCannedACL.public_read;
  private cloudfrontUrl: string;
  private publicBucketName: string;
  private s3Client: S3Client;

  constructor(private readonly config: S3Config) {
    this.s3Client = new S3Client({
      region: config.getOption('region'),
      credentials: {
        accessKeyId: config.getOption('accessKeyId'),
        secretAccessKey: config.getOption('secretAccessKey'),
      },
    });

    this.publicBucketName = config.getOption('publicBucketName');
    this.cloudfrontUrl = config.getOption('cloudfrontUrl');
  }

  private getRandomString = (length = 6): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  private getKey(filename: string, prefix?: string) {
    return `${prefix ? `${prefix}/` : ''}${dayjs().format(
      'YYYYMMDD'
    )}/${dayjs().format('hhmmss')}${this.getRandomString()}${filename}`;
  }

  private cleanFilename(filename: string): string {
    const MAX_LENGTH = 15;

    return filename
      .replace(/[\\/:"*?<>| ]+/gi, '')
      .trim()
      .slice(Math.max(0, filename.length - MAX_LENGTH));
  }

  private getUrl(key: string) {
    return this.cloudfrontUrl + key;
  }

  async uploadBuffer(buffer: Buffer, mimetype: string, prefix?: string): Promise<S3UploadResult> {
    const key = this.getKey('.' + mimetype.split('/')[1], prefix);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.publicBucketName,
        Key: key,
        Body: buffer,
        ACL: this.ACL,
        ContentType: mimetype,
      })
    );

    return {
      key,
      url: this.getUrl(key),
    };
  }

  async uploadStream(
    stream: ReadStream,
    filename: string,
    mimetype: string,
    prefix?: string
  ): Promise<S3UploadResult> {
    const key = this.getKey(this.cleanFilename(filename), prefix);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.publicBucketName,
        Key: key,
        Body: stream,
        ACL: this.ACL,
        ContentType: mimetype,
      })
    );

    return {
      key,
      url: this.getUrl(key),
    };
  }

  async deleteObjects(keys: string[]) {
    for (let start = 0; start < keys.length; start += MAX_DELETE_SIZE) {
      const end = start + MAX_DELETE_SIZE;

      await this.s3Client.send(
        new DeleteObjectsCommand({
          Bucket: this.config.getOption('publicBucketName'),
          Delete: {
            Objects: keys.slice(start, end).map(key => ({ Key: key })),
          },
        })
      );
    }
  }
}
