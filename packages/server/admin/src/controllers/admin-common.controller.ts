import { AwsS3Service } from '@awesome-dev/server-aws-s3';
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AdminGuard } from '../providers';

/**
 * path는 '/admin/common'으로 설정된다.
 * 파일 업로드 API를 제공한다.
 */
@UseGuards(AdminGuard)
@Controller('/admin/common')
export class AdminCommonController {
  constructor(private awsS3Service: AwsS3Service) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Array<Express.Multer.File>): Promise<string[]> {
    const results = await Promise.all(
      files.map(file => this.awsS3Service.uploadBuffer(file.buffer, file.mimetype))
    );

    return results.map(result => result.url);
  }
}
