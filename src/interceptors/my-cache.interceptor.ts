import {CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Observable, throwError, TimeoutError} from 'rxjs';
import {tap} from "rxjs/operators";


@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
      const method = context.getHandler();

      return next.handle().pipe(
        tap(data => {
          const cachedData = this.reflector.get<any>('cacheData', method)
          console.log('data from cache: ', cachedData);

          Reflect.defineMetadata('cacheData', data, method)
        })
      )
    }
}