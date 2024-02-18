#!/usr/bin/env node
import { register } from 'ts-node';
register({
  require: ['tsconfig-paths/register'],
});
import './cli';
