#!/usr/bin/env node
import 'reflect-metadata';
import yargs from 'yargs';
import {
  NewMigrationGenerateCommand,
  NewMigrationRevertCommand,
  NewMigrationRunCommand,
  NewMigrationShowCommand,
} from './commands';

yargs
  .usage('Usage: $0 <command> [options]')
  .command(new NewMigrationGenerateCommand())
  .command(new NewMigrationRevertCommand())
  .command(new NewMigrationRunCommand())
  .command(new NewMigrationShowCommand())
  .strict()
  .parse();
