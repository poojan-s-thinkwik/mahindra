import pool from '../database/connect.js';
import moment from 'moment';

class Report {

    constructor() {}

    haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (angle) => (Math.PI / 180) * angle;
        const R = 6371; // Earth radius in KM
      
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in KM
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
            totalDistance += this.haversineDistance(lat1, lon1, lat2, lon2);
          }
        }
      
        return totalDistance;
      };
      

    logParkedReports = async ({
        mheId,
        mheName,
        deviceId,
        deviceName,
        imei,
        duration,
        startTime,
        endTime,
        logTime,
        warehouseId
    }) => {
        try {
            const q = `INSERT INTO parked_reports (
                mhe_id,
                mhe_name,
                device_id,
                device_name,
                imei,
                duration,
                start_time,
                end_time,
                log_time,
                warehouseId
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            await pool.query(q, [
                mheId,
                mheName,
                deviceId,
                deviceName,
                imei,
                duration,
                startTime,
                endTime,
                logTime,
                warehouseId
            ]);
        } catch(err) {
            console.log(err);
        }
    }

    logIdleWithLoadReports = async ({
        mheId,
        mheName,
        deviceId,
        deviceName,
        imei,
        duration,
        startTime,
        endTime,
        logTime,
        warehouseId
    }) => {
        try {
            const q = `INSERT INTO idle_with_load_reports (
                mhe_id,
                mhe_name,
                device_id,
                device_name,
                imei,
                duration,
                start_time,
                end_time,
                log_time,
                warehouseId
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            await pool.query(q, [
                mheId,
                mheName,
                deviceId,
                deviceName,
                imei,
                duration,
                startTime,
                endTime,
                logTime,
                warehouseId
            ]);
        } catch(err) {
            console.log(err);
        }
    }

    logRunningReports = async ({
        mheId,
        mheName,
        deviceId,
        deviceName,
        imei,
        duration,
        startTime,
        endTime,
        logTime,
        warehouseId
    }) => {
        try {
            const q = `INSERT INTO running_reports (
                mhe_id,
                mhe_name,
                device_id,
                device_name,
                imei,
                duration,
                start_time,
                end_time,
                log_time,
                warehouseId
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            await pool.query(q, [
                mheId,
                mheName,
                deviceId,
                deviceName,
                imei,
                duration,
                startTime,
                endTime,
                logTime,
                warehouseId
            ]);
        } catch(err) {
            console.log(err);
        }
    }

    logForkMovementReports = async ({
        mheId,
        mheName,
        deviceId,
        deviceName,
        imei,
        duration,
        startTime,
        endTime,
        logTime,
        warehouseId,
    }) => {
        try {
            const q = `INSERT INTO fork_movement_reports (
                mhe_id,
                mhe_name,
                device_id,
                device_name,
                imei,
                duration,
                start_time,
                end_time,
                log_time,
                warehouseId
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            await pool.query(q, [
                mheId,
                mheName,
                deviceId,
                deviceName,
                imei,
                duration,
                startTime,
                endTime,
                logTime,
                warehouseId
            ]);
        } catch(err) {
            console.log(err);
        }
    }

    logLoadedDistanceReports = async ({
        mheId,
        mheName,
        deviceId,
        deviceName,
        imei,
        duration,
        startTime,
        endTime,
        logTime,
        warehouseId
    }) => {
        try {
            const q = `INSERT INTO loaded_distance_reports (
                mhe_id,
                mhe_name,
                device_id,
                device_name,
                imei,
                duration,
                start_time,
                end_time,
                log_time,
                warehouseId
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            await pool.query(q, [
                mheId,
                mheName,
                deviceId,
                deviceName,
                imei,
                duration,
                startTime,
                endTime,
                logTime,
                warehouseId
            ]);
        } catch(err) {
            console.log(err);
        }
    }

    logUnloadedDistanceReports = async ({
        mheId,
        mheName,
        deviceId,
        deviceName,
        imei,
        duration,
        startTime,
        endTime,
        logTime,
        warehouseId
    }) => {
        try {
            const q = `INSERT INTO loaded_distance_reports (
                mhe_id,
                mhe_name,
                device_id,
                device_name,
                imei,
                duration,
                start_time,
                end_time,
                log_time,
                warehouseId
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            await pool.query(q, [
                mheId,
                mheName,
                deviceId,
                deviceName,
                imei,
                duration,
                startTime,
                endTime,
                logTime,
                warehouseId
            ]);
        } catch(err) {
            console.log(err);
        }
    }
      

    generateReport = async (data) => {
        try {
            console.log("__________________________________");
            let parkedStartTime;
            let parkedStopTime;

            let idleStartTime;
            let idleStopTime;

            let runningStartTime;
            let runningStopTime;

            let loadedDistanceStartTime;
            let loadedDistanceStopTime;
            let loadedDistance = 0;

            let forkMovementStartTime;
            let forkMovementStopTime;

            let unloadedDistanceStartTime;
            let unloadedDistanceStopTime;
            let unloadedDistance = 0;
            
            for (let i = 0; i < data.length; i++) {
                const d = data[i];

                // parking
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
                    let parkDuration = parkedStopTime.diff(parkedStartTime, 'seconds');
                    if (parkDuration < 0) parkDuration *= -1;
                    console.log(`${d.mheId} Parked for ${parkDuration} seconds`);
                    
                    if (parkDuration > 0) {
                        await this.logParkedReports({
                            mheId: d.mheId,
                            mheName: d.mheName,
                            deviceId: d.deviceId,
                            deviceName: d.deviceName,
                            imei: d.imei,
                            duration: parkDuration,
                            startTime: parkedStartTime,
                            endTime: parkedStopTime,
                            logTime: d.updatedAt,
                            warehouseId: d.warehouseId
                        });
                    }

                    parkedStartTime = null;
                    parkedStopTime = null;
                }

                // idle
                if (d.ignition == 1 && d.forkMovement <= 1026 && d.sensorLoad >= 2000 && !idleStartTime) {
                    idleStartTime = d.updatedAt;
                } else if (d.ignition == 1 && (d.forkMovement > 1026 || d.sensorLoad < 2000) && idleStartTime) {
                    idleStopTime = d.updatedAt;
                }

                if (i == data.length - 1) {
                    if (!idleStartTime) idleStartTime = d.updatedAt;
                    if (!idleStopTime) idleStopTime = d.updatedAt;
                }

                if (idleStartTime && idleStopTime) {
                    let idleDuration = idleStopTime.diff(idleStartTime, 'seconds');
                    if (idleDuration < 0) idleDuration *= -1;
                    console.log(`${d.mheId} Idled for ${idleDuration} seconds`);

                    if (idleDuration > 0) {

                        await this.logIdleWithLoadReports({
                            mheId: d.mheId,
                            mheName: d.mheName,
                            deviceId: d.deviceId,
                            deviceName: d.deviceName,
                            imei: d.imei,
                            duration: idleDuration,
                            startTime: idleStartTime,
                            endTime: idleStopTime,
                            logTime: d.updatedAt,
                            warehouseId: d.warehouseId
                        });
                    }

                    idleStartTime = null;
                    idleStopTime = null;
                }

                // running
                if (d.speed > 0 && !d.runningStartTime) {
                    runningStartTime = d.updatedAt;
                } else if (d.speed == 0 && runningStartTime) {
                    runningStopTime = d.updatedAt;
                }

                if (i == data.length - 1) {
                    if (!runningStartTime) runningStartTime = d.updatedAt;
                    if (!runningStopTime) runningStopTime = d.updatedAt;
                }

                if (runningStartTime && runningStopTime) {
                    let runningDuration = runningStopTime.diff(runningStartTime, 'seconds');
                    if (runningDuration < 0) runningDuration *= -1;
                    console.log(`${d.mheId} Running for ${runningDuration} seconds`);
                    if (runningDuration > 0) {
                        await this.logRunningReports({
                            mheId: d.mheId,
                            mheName: d.mheName,
                            deviceId: d.deviceId,
                            deviceName: d.deviceName,
                            imei: d.imei,
                            duration: runningDuration,
                            startTime: runningStartTime,
                            endTime: runningStopTime,
                            logTime: d.updatedAt,
                            warehouseId: d.warehouseId
                        })
                    }
                    runningStartTime = null;
                    runningStopTime = null;
                }

                // fork movement
                if (d.forkMovement >= 1026 && !forkMovementStartTime) {
                    forkMovementStartTime = d.updatedAt;
                } else if (d.forkMovement < 1026 && forkMovementStartTime) {
                    forkMovementStopTime = d.updatedAt;
                }

                if (i == data.length - 1) {
                    forkMovementStartTime = d.updatedAt;
                    forkMovementStopTime = d.updatedAt;
                }

                if (forkMovementStartTime && forkMovementStopTime) {
                    let forkMovementDuration = forkMovementStopTime.diff(forkMovementStartTime, 'seconds');
                    if (forkMovementDuration < 0) forkMovementDuration *= -1;
                    console.log(`${d.mheId} Fork Movement for ${forkMovementDuration} seconds`);

                    if (forkMovementDuration > 0) {
                        await this.logForkMovementReports({
                            mheId: d.mheId,
                            mheName: d.mheName,
                            deviceId: d.deviceId,
                            deviceName: d.deviceName,
                            imei: d.imei,
                            duration: forkMovementDuration,
                            startTime: forkMovementStartTime,
                            endTime: forkMovementStopTime,
                            logTime: d.updatedAt,
                            warehouseId: d.warehouseId
                        });
                    }

                    forkMovementStartTime = null;
                    forkMovementStopTime = null;
                }

                // loaded distance
                if (data[i - 1]) {   
                    
                    const prev = data[i - 1];
                    const curr = data[i];
                
                    // Convert latitude & longitude to numbers
                    const lat1 = parseFloat(prev.latitude || 0);
                    const lon1 = parseFloat(prev.longitude || 0);
                    const lat2 = parseFloat(curr.latitude || 0);
                    const lon2 = parseFloat(curr.longitude || 0); 
                    
                    if (d.ignition == 1 && d.sensorLoad >= 1010 && d.sensorLoad <= 1950) {

                        loadedDistance += this.haversineDistance(lat1, lon1, lat2, lon2);
                        
                        if (!loadedDistanceStartTime) {
                            loadedDistanceStartTime = d.updatedAt;
                        }

                        if (unloadedDistanceStartTime) {
                            unloadedDistanceStopTime = d.updatedAt;
                        }
                    } else if (d.ignition == 1 && d.sensorLoad <1010 || d.sensorLoad > 2000) {
                        
                        unloadedDistance += this.haversineDistance(lat1, lon1, lat2, lon2);
                        
                        if (!unloadedDistanceStartTime) {
                            unloadedDistanceStartTime = d.updatedAt   
                        }

                        if (loadedDistanceStartTime) {
                            loadedDistanceStopTime = d.updatedAt;
                        }
                    }

                    if (i == data.length - 1) {
                        loadedDistanceStartTime = d.updatedAt;
                        loadedDistanceStopTime = d.updatedAt;
                        unloadedDistanceStartTime = d.updatedAt;
                        unloadedDistanceStopTime = d.updatedAt;
                    }

                    if (loadedDistanceStartTime && loadedDistanceStopTime) {
                        let loadedDistanceDuration = loadedDistanceStopTime.diff(loadedDistanceStartTime, 'seconds');
                        console.log(d.mheId, 'Loaded distance', loadedDistanceDuration, loadedDistance);
                        
                        if (loadedDistanceDuration > 0) {
                            await this.logLoadedDistanceReports({
                                mheId: d.mheId,
                                mheName: d.mheName,
                                deviceId: d.deviceId,
                                deviceName: d.deviceName,
                                imei: d.imei,
                                duration: loadedDistanceDuration,
                                startTime: loadedDistanceStartTime,
                                endTime: loadedDistanceStopTime,
                                logTime: d.updatedAt,
                                warehouseId: d.warehouseId
                            })
                        }
                        
                        loadedDistanceStartTime = null;
                        loadedDistanceStopTime = null;
                        loadedDistance = 0;
                    }

                    if (unloadedDistanceStartTime && unloadedDistanceStopTime) {
                        let unloadedDistanceDuration = unloadedDistanceStopTime.diff(unloadedDistanceStartTime, 'seconds');
                        console.log(d.mheId, 'Unloaded distance', unloadedDistanceDuration, unloadedDistance);
                        
                        if (unloadedDistanceDuration > 0) {
                            await this.logUnloadedDistanceReports({
                                mheId: d.mheId,
                                mheName: d.mheName,
                                deviceId: d.deviceId,
                                deviceName: d.deviceName,
                                imei: d.imei,
                                duration: unloadedDistanceDuration,
                                startTime: unloadedDistanceStartTime,
                                endTime: unloadedDistanceStopTime,
                                logTime: d.updatedAt,
                                warehouseId: d.warehouseId
                            })
                        }
                        
                        unloadedDistanceStartTime = null;
                        unloadedDistanceStopTime = null;
                        unloadedDistance = 0;
                    }
    
                } 

            }
            console.log("--------------------------------------------");
            return;
        } catch(err) {
            console.log(err);
        }
    }
}


export default Report;