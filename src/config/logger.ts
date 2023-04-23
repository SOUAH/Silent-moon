import * as winston from "winston";//winston is a name of a package for logging its the same as logcat but different name

const levels = {//show me level 0 which is the most important errors
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {//if I call this fct it will debug and everything below so all the levels
  return "debug";
};

const colors = {//colors of levels for example error is red
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

winston.addColors(colors);//adding colors

const format = winston.format.combine(//when exactly the logs happen is like logcat
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [//transport logs, the step that happens just for the logs to appear
  new winston.transports.Console(),//I will see everything in console (terminale)
  new winston.transports.File({
    filename: "logs/error.log",//this is for error logs to specify the level
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),//everything I see in terminale will be saved in this log file
];

const Logger = winston.createLogger({//this one contain everything above and the one that is going to be exported
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;
