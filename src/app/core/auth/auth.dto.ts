import { IsEnum, IsString } from 'class-validator';
import { Gender } from 'src/app/enum/global.enum';

export class RegisterUserDto {
  @IsString()
  username: string;
  @IsEnum(Gender)
  gender: string;
  @IsString()
  password: string;
}
