import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Metadata = createParamDecorator(
  (key: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!key) return request.metadata;

    return request.metadata[key];
  },
);
