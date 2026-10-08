import { IsBoolean, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar_url?: string;

  @IsOptional()
  @IsBoolean()
  graph_visible?: boolean;
}
