import { logger } from '../utils';

const glob = require('glob');
const fs = require('fs-extra');
const { basename, join } = require('path');

const copy = ({ source, destination }, options = {}) => {
  const { log: logType } = options;
  try {
    const wrapSources = Array.isArray(source) ? source : [source];
    const sources = wrapSources.map((source) => glob.sync(source) || []);
    sources.forEach((subsources) => {
      subsources.forEach((source) => {
        const dis = join(destination, basename(source));
        fs.copySync(source, dis, {
          preserveTimestamps: true,
          filter: (src, dest) => {
            const sStat = fs.statSync(src);
            const isExist = fs.existsSync(dest);
            let flag = false;
            if (!isExist) {
              flag = true;
            } else {
              const dStat = fs.statSync(dest);
              if (
                sStat.isFile() &&
                parseInt(sStat.mtimeMs, 10) === parseInt(dStat.mtimeMs, 10)
              ) {
                flag = false;
              } else {
                flag = true;
              }
            }
            if (sStat.isDirectory()) {
              return true;
            }
            if (!flag) {
              logger.setType(logType).info(`info: '${dest}' is not modify`);
            } else {
              logger
                .setType(logType)
                .info(`success: copy '${src}' to '${dest}'`);
            }
            return flag;
          },
        });
        // logger.setType(logType).info(`success: copy '${source}' to '${dis}'`);
        // const sStat = fs.statSync(source);
        // const isExist = fs.existsSync(dis);
        // if (!isExist) {
        //   fs.copySync(source, dis, { preserveTimestamps: true });
        //   logger.setType(logType).info(`success: copy '${source}' to '${dis}'`);
        // } else {
        //   const dStat = fs.statSync(dis);
        //   if (sStat.isFile() && sStat.mtimeMs === dStat.mtimeMs) {
        //     console.log(sStat.mtimeMs === dStat.mtimeMs);
        //     logger.setType(logType).info(`success: '${dis}' is not modify`);
        //   } else {
        //     fs.copySync(source, dis, { preserveTimestamps: true });
        //     logger
        //       .setType(logType)
        //       .info(`success: copy '${source}' to '${dis}'`);
        //   }
        // }
      });
    });
  } catch (e) {
    logger.error(`copy error: ${e}`);
  }
};

export default copy;
