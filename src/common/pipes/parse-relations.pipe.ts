import { PipeTransform, Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class ParseRelationsPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return value;

    const tokens = value.split(',').map((token) => token.trim());
    const relations = _.zipObjectDeep(tokens, _.map(tokens, _.constant(true)));

    return relations;
  }
}
