/*
 *
 * The main App module.
 *
 */

// ! Dependencies.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Url } from './url-mon/url.entity';
import { UrlMonModule } from './url-mon/url-mon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: false, // ? Set to true to automatically load entities.
          entities: [User, Url],
          synchronize: true, // ? Must be set to false when app running in production mode.
        };
      },
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAILER_HOST'),
          port: config.get('MAILER_PORT'),
          tls: {
            ciphers: config.get('MAILER_SEC'),
          },
          secure: false, // * true for 465, false for other ports
          auth: {
            user: config.get('MAILER_USER'),
            pass: config.get('MAILER_PASS'),
          },
        },
        defaults: {
          from: config.get('EMAIL_FROM'), // sender address
          subject: 'Testing Nest MailerModule ✔', // Subject line
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UsersModule,
    AuthModule,
    UrlMonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // ! DataSource and EntityManager objects will be available to inject across the entire project (without needing to import any modules).
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}
}
