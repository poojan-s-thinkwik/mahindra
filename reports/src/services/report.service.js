import Api from '../utils/api.service.js';
import moment from 'moment';

class ReportService {

    constructor(reportRepository) {
        this.reportRepository = reportRepository;
        this.api = new Api();
    }

    formatReportTime = (time) => {
        return moment.utc(time * 1000).format("HH:mm:ss");
    }

    haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (angle) => (Math.PI / 180) * angle;
        const R = 6371000;
      
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    calculateTotalDistance = (data) => {
        let totalDistance = 0;
      
        for (let i = 1; i < data.length; i++) {
          const prev = data[i - 1];
          const curr = data[i];
      
          // Convert latitude & longitude to numbers
          const lat1 = parseFloat(prev.latitude);
          const lon1 = parseFloat(prev.longitude);
          const lat2 = parseFloat(curr.latitude);
          const lon2 = parseFloat(curr.longitude);
      
          if (lat1 !== 0 && lon1 !== 0 && lat2 !== 0 && lon2 !== 0) {
            totalDistance = this.haversineDistance(lat1, lon1, lat2, lon2);
          }
        }
      
        return totalDistance;
    };

    calculateParkedDuration = (data) => {
        try {
            let parkedStartTime;
            let parkedStopTime;
            let duration = 0;
            const details = [];

            for (let i = 0; i < data.length; i++) {
                const d = data[i];
                d.updatedAt = moment(d.updatedAt, 'YYYY-MM-DD HH:mm:ss');
                
                if (d.ignition == 0 && !parkedStartTime) {
                    parkedStartTime = d.updatedAt;
                } else if (d.ignition == 1 && parkedStartTime) {
                    parkedStopTime = d.updatedAt;
                }

                if (i == data.length - 1) {
                    if (!parkedStartTime) parkedStartTime = d.updatedAt;
                    if (!parkedStopTime) parkedStopTime = d.updatedAt;
                }

                if (parkedStartTime && parkedStopTime) {
                    const parkedDuration = parkedStopTime.diff(parkedStartTime, 'seconds');
                    duration += parkedDuration;
                    details.push({
                        duration: this.formatReportTime(parkedDuration),
                        startTime: parkedStartTime,
                        endTime: parkedStopTime
                    })
                    parkedStartTime = null;
                    parkedStopTime = null;
                }
            }

            return {
                duration: this.formatReportTime(duration),
                details
            };
        } catch(err) {
            throw err;
        }
    }

    calculateIdleDuration = (data) => {
        try {
            let idleStartTimeWithLoad;
            let idleStartTimeWithoutLoad;
            let idleStopTimeWithLoad;
            let idleStopTimeWithoutLoad;
            const details = [];
            let totalDurationWithoutLoad = 0;
            let totalDurationWithLoad = 0;
            let totalDuration = 0;

            for (let i = 0; i < data.length; i ++) {
                const d = data[i];
                d.updatedAt = moment(d.updatedAt, 'YYYY-MM-DD HH:mm:ss');

                if (d.ignition == 1 && d.forkMovement <= 1026 && d.sensorLoad >= 2000) {
                    if (!idleStartTimeWithLoad) {
                        idleStartTimeWithoutLoad = d.updatedAt;
                    }
                    if (idleStartTimeWithLoad) {
                        idleStopTimeWithLoad = d.updatedAt;
                    }
                } else if (d.ignition == 1 && (d.forkMovement > 1026 || d.sensorLoad < 2000)) {
                    if (idleStartTimeWithoutLoad) {
                        idleStopTime = d.updatedAt;
                    }
                    if (!idleStartTimeWithLoad) {
                        idleStartTimeWithLoad = d.updatedAt;
                    }
                }

                if (idleStartTimeWithoutLoad && idleStopTimeWithoutLoad) {
                    const duration = idleStopTimeWithoutLoad.diff(idleStartTimeWithoutLoad, 'seconds');
                    totalDurationWithoutLoad += duration;
                    totalDuration += duration;

                    details.push({
                        durationWithoutLoad: this.formatReportTime(duration),
                        durationWithLoad: '',
                        startTime: idleStartTimeWithoutLoad,
                        endTime: idleStopTimeWithoutLoad
                    })

                    idleStartTimeWithoutLoad = null;
                    idleStopTimeWithoutLoad = null;
                }

                if (idleStartTimeWithLoad && idleStopTimeWithLoad) {
                    const duration = idleStopTimeWithLoad.diff(idleStartTimeWithLoad, 'seconds');
                    totalDurationWithLoad += duration;
                    totalDuration += duration;

                    details.push({
                        durationWithoutLoad: '',
                        durationWithLoad: this.formatReportTime(duration),
                        startTime: idleStartTimeWithLoad,
                        endTime: idleStopTimeWithLoad
                    })

                    idleStartTimeWithLoad = null;
                    idleStopTimeWithLoad = null;
                }
                


            }

            return {
                duration: this.formatReportTime(totalDuration),
                details
            };
        } catch(err) {
            throw err;
        }
    }

    calculateDistanceTravelled = (data) => {
        try {
            let durationWithLoad = 0;
            let durationWithoutLoad = 0;
            let distanceWithLoad = 0;
            let distanceWithoutLoad = 0;
            let totalDuration = 0;
            let totalDistance = 0;

            let loadedStartTime;
            let loadedStopTime;
            let unloadedStartTime;
            let unloadedStopTime;

            let distanceWithLoadIm = 0;
            let distanceWithoutLoadIm = 0;
            let durationWithLoadIm;
            let durationWithoutLoadIm;

            const details = [];

            if (data.length < 2) {
                return {
                    totalDistance,
                    totalDuration: this.formatReportTime(totalDuration),
                    distanceWithoutLoad,
                    durationWithoutLoad: this.formatReportTime(durationWithoutLoad),
                    distanceWithLoad,
                    durationWithLoad: this.formatReportTime(durationWithLoad),
                    details
                }
            }

            for (let i = 1; i < data.length; i++) {
                const curr = data[i];
                const prev = data[i - 1];
                const d = data[i];

                const lat1 = parseFloat(prev.latitude || 0);
                const lon1 = parseFloat(prev.longitude || 0);
                const lat2 = parseFloat(curr.latitude || 0);
                const lon2 = parseFloat(curr.longitude || 0);

                if (d.ignition == 1 && d.sensorLoad >= 1010 && d.sensorLoad <= 1950) {

                    distanceWithLoadIm += this.haversineDistance(lat1, lon1, lat2, lon2);

                    if (!loadedStartTime) {
                        loadedStartTime = d.updatedAt;
                    }

                    if (unloadedStartTime) {
                        unloadedStopTime = d.updatedAt;
                    }
                } else if (d.ignition == 1 && (d.sensorLoad > 2000 || d.sensorLoad < 950)) {
                    
                    distanceWithoutLoadIm += this.haversineDistance(lat1, lon1, lat2, lon2);

                    if (!unloadedStartTime) {
                        unloadedStartTime = d.updatedAt   
                    }

                    if (loadedStartTime) {
                        loadedStopTime = d.updatedAt;
                    }
                }

                if (loadedStartTime && loadedStopTime) {
                    durationWithLoadIm = loadedStopTime.diff(loadedStartTime, 'seconds');
                    durationWithLoad = +durationWithLoadIm;
                    totalDuration += durationWithLoadIm;

                    if (durationWithLoadIm > 0) {
                        distanceWithLoad += distanceWithLoadIm;
                        totalDistance += distanceWithLoadIm;
                    } else {
                        distanceWithLoadIm = 0;
                    }

                    details.push({
                        durationWithLoad: this.formatReportTime(durationWithLoadIm),
                        distanceWithLoad: distanceWithLoadIm,
                        durationWithoutLoad: '',
                        distanceWithoutLoad: ''
                    })

                    loadedStartTime = null;
                    loadedStopTime = null;
                    distanceWithLoadIm = 0;
                }

                if (unloadedStartTime && unloadedStopTime) {
                    durationWithoutLoadIm = unloadedStopTime.diff(unloadedStartTime, 'seconds');
                    durationWithoutLoad += durationWithoutLoadIm;
                    totalDuration += durationWithoutLoadIm;

                    if (durationWithoutLoadIm > 0) {
                        distanceWithoutLoad += distanceWithoutLoadIm;
                        totalDistance += distanceWithoutLoadIm;
                    } else {
                        distanceWithoutLoadIm = 0;
                    }

                    details.push({
                        durationWithLoad: '',
                        distanceWithLoad: '',
                        durationWithoutLoad: this.formatReportTime(durationWithoutLoadIm),
                        distanceWithoutLoad: distanceWithoutLoadIm
                    })

                    unloadedStartTime = null;
                    unloadedStopTime = null;
                    distanceWithoutLoadIm = 0;
                }
            }

            return {
                totalDistance,
                totalDuration: this.formatReportTime(totalDuration),
                distanceWithoutLoad,
                durationWithoutLoad: this.formatReportTime(durationWithoutLoad),
                distanceWithLoad,
                durationWithLoad: this.formatReportTime(durationWithLoad),
                details
            }
        } catch(err) {
            throw err;
        }
    }

    generateParkedReport = async ({ startDate, endDate }) => {
        try {
            const mhes = await this.api.request({ url: '/mhe' });

            const startDateInflux = moment(startDate, 'YYYY-MM-DD HH:mm:ss').valueOf() * 1e6;
            const endDateInflux = moment(endDate, 'YYYY-MM-DD HH:mm:ss').valueOf() * 1e6;
            
            const reportData = [];

            for (let i = 0; i < mhes.length; i++) {
                const mhe = mhes[i];
                const rawData = await this.reportRepository.getDataByMhe({ mheId: mhe.mheId, startDate: startDateInflux, endDate: endDateInflux });
                reportData.push({
                    ...mhe,
                    data: this.calculateParkedDuration(rawData)
                })
            }

            return reportData;
            
            // const data = await this.reportRepository.getParkedReportData({ startDate, endDate });
            // const dataByMhe = {};
            // data.forEach(d => {
            //     const mheId = d.mheId;
            //     if (!dataByMhe[mheId]) {
            //         dataByMhe[mheId] = {
            //             mheName: d.mheName,
            //             imei: d.imei,
            //             totalDuration: 0,
            //         };
            //     }
            //     dataByMhe[mheId].totalDuration += +d.duration;
            // })
            // const results = Object.values(dataByMhe).map(d => d);
            // return results;
        } catch(err) {
            throw err;
        }
    }

    generateIdleReport = async ({ startDate, endDate }) => {
        try {
            const mhes = await this.api.request({ url: '/mhe' });

            const startDateInflux = moment(startDate, 'YYYY-MM-DD HH:mm:ss').valueOf() * 1e6;
            const endDateInflux = moment(endDate, 'YYYY-MM-DD HH:mm:ss').valueOf() * 1e6;
            
            const reportData = [];

            for (let i = 0; i < mhes.length; i++) {
                const mhe = mhes[i];
                const rawData = await this.reportRepository.getDataByMhe({ mheId: mhe.mheId, startDate: startDateInflux, endDate: endDateInflux });
                reportData.push({
                    ...mhe,
                    data: this.calculateIdleDuration(rawData)
                })
            }

            return reportData;
        } catch(err) {
            throw err;
        }
    }

    generateDistanceReport = async ({ startDate, endDate }) => {
        try {
            const mhes = await this.api.request({ url: '/mhe' });

            const startDateInflux = moment(startDate, 'YYYY-MM-DD HH:mm:ss').valueOf() * 1e6;
            const endDateInflux = moment(endDate, 'YYYY-MM-DD HH:mm:ss').valueOf() * 1e6;
            
            const reportData = [];

            for (let i = 0; i < mhes.length; i++) {
                const mhe = mhes[i];
                const rawData = await this.reportRepository.getDataByMhe({ mheId: mhe.mheId, startDate: startDateInflux, endDate: endDateInflux });
                reportData.push({
                    ...mhe,
                    data: this.calculateDistanceTravelled(rawData)
                })
            }

            return reportData;
        } catch(err) {
            throw err;
        }
    }
}

export default ReportService;