import { createLogger, format, transports, Logger } from 'winston';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class AppLogger {

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({
          filename: path.join(__dirname, '../../logs', 'error.log'),
          level: 'error',
        }),
        new transports.File({
          filename: path.join(__dirname, '../../logs', 'combined.log'),
        }),
      ],
      exceptionHandlers: [
        new transports.File({
          filename: path.join(__dirname, '../../logs', 'exceptions.log'),
        }),
      ],
      rejectionHandlers: [
        new transports.File({
          filename: path.join(__dirname, '../../logs', 'rejections.log'),
        }),
      ],
    });
  }

  info = (message, meta) => {
    this.logger.info(message, meta);
  }

  warn = (message, meta) => {
    this.logger.warn(message, meta);
  }

  error = (message, meta) => {
    this.logger.error(message, meta);
  }

  debug = (message, meta) => {
    this.logger.debug(message, meta);
  }
}
