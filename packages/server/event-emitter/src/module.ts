import { DynamicModule, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitter } from './event-emitter';

@Module({})
export class AwesomeEventEmitterModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      imports: [EventEmitterModule.forRoot()],
      module: AwesomeEventEmitterModule,
      providers: [EventEmitter],
      exports: [EventEmitter],
    };
  }
}
