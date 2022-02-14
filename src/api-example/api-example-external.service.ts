import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { Cache } from 'cache-manager';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class ApiExampleExternalService {
  private readonly SERVICE_URL: string;
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.SERVICE_URL = this.configService.get<string>('TEST_URL');
  }

  async login(userId: string) {
    const config: AxiosRequestConfig = {
      url: `${this.SERVICE_URL}/signin`,
      method: 'POST',
      data: { userId },
    };
    return await lastValueFrom(this.httpService.request(config).pipe(map((resp) => resp.data)));
  }

  async search(requestData, accessToken: string) {
    const config: AxiosRequestConfig = {
      url: `${this.SERVICE_URL}/search`,
      method: 'POST',
      headers: { 'X-Auth-Token': accessToken },
      data: requestData,
    };
    return await lastValueFrom(this.httpService.request(config).pipe(map((resp) => resp.data)));
  }

  async refreshToken(userId: string, refreshToken: string) {
    const config: AxiosRequestConfig = {
      url: `${this.SERVICE_URL}/refresh_token`,
      method: 'POST',
      data: { userId, refreshToken },
    };
    return await lastValueFrom(this.httpService.request(config).pipe(map((resp) => resp.data)));
  }
}
