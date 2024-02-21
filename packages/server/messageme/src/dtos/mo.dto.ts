import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/** MO(문자수신)서비스의 webhook payload입니다 */
export class MessagemeMoDto {
  /** 문자 내용 */
  @ApiProperty({ description: '문자 내용' })
  @IsString()
  msg: string;

  /** 발신자 번호 */
  @ApiProperty({ description: '발신자 번호' })
  @IsString()
  phone: string;

  /** 문자 제목 */
  @ApiProperty({ description: '문자 제목', required: false })
  @IsString()
  @IsOptional()
  subject?: string;
}
