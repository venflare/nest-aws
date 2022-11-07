import { PipeTransform, Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ParseSelectPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return value;

    const tokens = value.split(',').map((token) => token.trim());
    const select = _.zipObjectDeep(tokens, _.map(tokens, _.constant(true)));

    return select;
  }
}
