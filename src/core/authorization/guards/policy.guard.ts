import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import * as _ from 'lodash';

import { AccessTokenGuard } from '../../authentication/guards';

export const PolicyGuard = (action: string): Type<CanActivate> => {
  class PolicyGuardMixin extends AccessTokenGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const policy = _.find(request.user.policies, { action });

      if (!policy) {
        return false;
      }

      return true;
    }
  }

  return mixin(PolicyGuardMixin);
};
