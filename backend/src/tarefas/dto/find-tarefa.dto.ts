import { IsOptional, IsString, IsBooleanString } from "class-validator";
export class FindTarefaDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBooleanString()
  completada?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}