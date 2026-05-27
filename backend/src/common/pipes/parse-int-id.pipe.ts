import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseIntIdPipe implements PipeTransform {
  transform(value: 'id', metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const valorAnalisado = Number(value);

    if (isNaN(valorAnalisado)) {
      throw new BadRequestException('O valor do id deve ser um número');
    }

    if (valorAnalisado <= 0) {
      throw new BadRequestException(
        'O valor do id deve ser um número positivo',
      );
    }

    return valorAnalisado;
  }
}
