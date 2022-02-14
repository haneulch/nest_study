import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ApiExampleExternalService } from './api-example-external.service';
import { ResponseUtils } from '../util/response.utils';

@Injectable()
export class ApiExampleService {
  constructor(
    private apiExampleExternalService: ApiExampleExternalService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async login(userId: string) {
    const data = await this.apiExampleExternalService.login(userId);
    await this.cacheManager.set(userId, data, { ttl: 60 * 100 });
    return ResponseUtils.success('success');
  }

  async getData(requestData) {
    let token = await this.cacheManager.get(requestData.userId);
    if (!token) {
      token = await this.login(requestData.userId);
    }

    let data = await this.apiExampleExternalService.search(requestData, token['accessToken']);
    if (data.message === 'expired token') {
      await this.refresh(requestData.userId);
      data = await this.apiExampleExternalService.search(requestData, token['accessToken']);
    }
    return ResponseUtils.success('', data);
  }

  async refresh(userId: string) {
    const token = await this.cacheManager.get(userId);
    const data = await this.apiExampleExternalService.refreshToken(userId, token['refreshToken']);
    if (data.message === 'invalid token') {
      throw new UnauthorizedException(data.message);
    }
    await this.cacheManager.set(userId, data, { ttl: 60 * 100 });
    return ResponseUtils.success('success');
  }
}
