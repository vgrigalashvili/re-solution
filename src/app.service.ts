/*
 *
 * The main App Service.
 *
 */

// Dependencies.
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'v1.';
  }
}
