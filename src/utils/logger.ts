import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create Winston logger
const logger = createLogger({
  level: "info", // default log level
  format: combine(
    colorize(), // adds colors to console
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    // Log to console
    new transports.Console(),

    // Log to a file (error only)
    new transports.File({ filename: "logs/error.log", level: "error" }),

    // Log all messages
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

// If in production, log only to files
if (process.env.NODE_ENV === "production") {
  logger.remove(new transports.Console());
}

export default logger;
