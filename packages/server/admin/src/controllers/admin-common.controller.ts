import { AwsS3Service } from '@awesome-dev/server-aws-s3';
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AdminGuard } from '../providers';

@UseGuards(AdminGuard)
@Controller('/admin/common')
export class AdminCommonController {
  constructor(private awsS3Service: AwsS3Service) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Array<Express.Multer.File>): Promise<string[]> {
    const results = await Promise.all(
      files.map(file =>
        this.awsS3Service.uploadBuffer(file.buffer, file.originalname, file.mimetype)
      )
    );

    return results.map(result => result.url);
  }
}
