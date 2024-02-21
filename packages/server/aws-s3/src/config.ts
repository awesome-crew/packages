import { Injectable, ModuleMetadata } from '@nestjs/common';

export interface S3ConfigOption {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicBucketName: string;
  cloudfrontUrl: string;
}

@Injectable()
export class S3Config {
  public constructor(private readonly option: S3ConfigOption) {}

  getOption(key: keyof S3ConfigOption) {
    return this.option[key];
  }
}

export interface S3AsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => S3Config | Promise<S3Config>;
  inject?: any[];
}
