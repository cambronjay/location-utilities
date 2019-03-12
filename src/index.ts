export module LocationUtility {
    // Accepts standard NMEA sentences and returns an object with the parsed data
    export function parseNMEA(sentence: any, unit: string): Object {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence = {};
            // Finds correct nmea sentence and parses it
            if (nmeaParsed[0].includes("DTM")) {
                var lastItem = (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    datum: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1] : '',
                    subDatum: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                    latitudeOffset: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                    latitudeDirection: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                    longitudeOffset: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                    longitudeDirection: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                    altitudeOffset: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                    refDatum: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? lastItem[0] : ''
                }
            } else if (nmeaParsed[0].includes("GBS")) {
                var lastItem = (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8].split('*') : 0;
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                    latitudeError: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                    longitudeError: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                    altitudeError: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? parseFloat(nmeaParsed[4]) : 0,
                    failedSatelliteID: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                    probability: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? parseFloat(nmeaParsed[6]) : 0,
                    bias: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                    standardDeviationOfBias: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(lastItem[0]) : 0
                }
            } else if (nmeaParsed[0].includes("GGA")) {
                var lastItem = (nmeaParsed[14] !== null && nmeaParsed[14] !== undefined && nmeaParsed[14] !== '') ? nmeaParsed[14].split('*') : 0;
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                    latitude: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? DMLatToDD(nmeaParsed[3], nmeaParsed[2]) : 0,
                    latitudeDirection: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? nmeaParsed[3] : '',
                    longitude: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? DMLongToDD(nmeaParsed[5], nmeaParsed[4]) : 0,
                    longitudeDirection: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? nmeaParsed[5] : '',
                    quality: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? parseFloat(nmeaParsed[6]) : 0,
                    satelliteCount: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                    HDOP: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(nmeaParsed[8]) : 0,
                    altitude: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? convertAlt(nmeaParsed[9], unit) : 0,
                    altitudeUnits: (nmeaParsed[10] !== null && nmeaParsed[10] !== undefined && nmeaParsed[10] !== '') ? nmeaParsed[10] : '',
                    GeoidSeparation: (nmeaParsed[11] !== null && nmeaParsed[11] !== undefined && nmeaParsed[11] !== '') ? parseFloat(nmeaParsed[11]) : 0,
                    GeoidSeparationUnits: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? nmeaParsed[12] : '',
                    ageOfDifferential: (nmeaParsed[13] !== null && nmeaParsed[13] !== undefined && nmeaParsed[13] !== '') ? parseFloat(nmeaParsed[13]) : 0,
                    ageOfDifferentialStation: (nmeaParsed[14] !== null && nmeaParsed[14] !== undefined && nmeaParsed[14] !== '') ? parseFloat(lastItem[0]) : 0
                }
            } else if (nmeaParsed[0].includes("GLL")) {
                var lastItem = (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? nmeaParsed[7].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    latitude: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? DMLatToDD(nmeaParsed[2], nmeaParsed[1]) : 0,
                    latitudeDirection: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                    longitude: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? DMLongToDD(nmeaParsed[4], nmeaParsed[3]) : 0,
                    longitudeDirection: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                    time: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? Number(nmeaParsed[5]) : 0,
                    status: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                    positionMode: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? lastItem[7] : ''
                }
            } else if (nmeaParsed[0].includes("GLQ")) {
                var lastItem = (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    messageID: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? lastItem[0] : ''
                }
            } else if (nmeaParsed[0].includes("GNQ")) {
                var lastItem = (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    messageID: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? lastItem[0] : ''
                }
            } else if (nmeaParsed[0].includes("GNS")) {
                var lastItem = (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? nmeaParsed[12].split('*') : 0;
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                    latitude: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? DMLatToDD(nmeaParsed[3], nmeaParsed[2]) : 0,
                    latitudeDirection: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? nmeaParsed[3] : '',
                    longitude: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? DMLongToDD(nmeaParsed[5], nmeaParsed[4]) : 0,
                    longitudeDirection: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? nmeaParsed[5] : '',
                    positionMode: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                    satelliteCount: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                    HDOP: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(nmeaParsed[8]) : 0,
                    altitude: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? parseFloat(nmeaParsed[9]) : 0,
                    GeoidSeparation: (nmeaParsed[10] !== null && nmeaParsed[10] !== undefined && nmeaParsed[10] !== '') ? parseFloat(nmeaParsed[10]) : 0,
                    ageOfDifferential: (nmeaParsed[11] !== null && nmeaParsed[11] !== undefined && nmeaParsed[11] !== '') ? parseFloat(nmeaParsed[11]) : 0,
                    ageOfDifferentialStation: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? parseFloat(lastItem[0]) : 0
                }
            } else if (nmeaParsed[0].includes("GPQ")) {
                var lastItem = (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    messageID: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? lastItem[0] : ''
                }
            } else if (nmeaParsed[0].includes("GRS")) {
                var lastItem = (nmeaParsed[14] !== null && nmeaParsed[14] !== undefined && nmeaParsed[14] !== '') ? nmeaParsed[14].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                    mode: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                    residual: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? [nmeaParsed[3], nmeaParsed[4], nmeaParsed[5], nmeaParsed[6], nmeaParsed[7], nmeaParsed[8], nmeaParsed[9], nmeaParsed[10], nmeaParsed[11], nmeaParsed[12], nmeaParsed[13], lastItem[0]] : ''
                }
            } else if (nmeaParsed[0].includes("GSA")) {
                var lastItem = (nmeaParsed[17] !== null && nmeaParsed[17] !== undefined && nmeaParsed[17] !== '') ? nmeaParsed[17].split('*') : 0;
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    operationMode: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1] : '',
                    navigationMode: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                    satelliteNumber: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? [nmeaParsed[3], nmeaParsed[4], nmeaParsed[5], nmeaParsed[6], nmeaParsed[7], nmeaParsed[8], nmeaParsed[9], nmeaParsed[10], nmeaParsed[11], nmeaParsed[12], nmeaParsed[13], nmeaParsed[14]] : '',
                    PDOP: (nmeaParsed[15] !== null && nmeaParsed[15] !== undefined && nmeaParsed[15] !== '') ? parseFloat(nmeaParsed[15]) : 0,
                    HDOP: (nmeaParsed[16] !== null && nmeaParsed[16] !== undefined && nmeaParsed[16] !== '') ? parseFloat(nmeaParsed[16]) : 0,
                    VDOP: (nmeaParsed[17] !== null && nmeaParsed[17] !== undefined && nmeaParsed[17] !== '') ? parseFloat(lastItem[0]) : 0
                }
            } else if (nmeaParsed[0].includes("GST")) {
                var lastItem = (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8].split('*') : 0;
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                    rangeRMS: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                    stdMajor: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                    stdMinor: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? parseFloat(nmeaParsed[4]) : 0,
                    orientation: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                    stdLatitudeError: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? parseFloat(nmeaParsed[6]) : 0,
                    stdLongitudeError: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                    stdAltitudeError: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(lastItem[0]) : 0
                }
            } else if (nmeaParsed[0].includes("GSV")) {
                var lastItem = (nmeaParsed[19] !== null && nmeaParsed[19] !== undefined && nmeaParsed[19] !== '') ? nmeaParsed[19].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    numberOfMessages: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? parseFloat(nmeaParsed[1]) : 0,
                    messageNumber: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                    satellitesInView: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                    satelliteIDs: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? [nmeaParsed[4], nmeaParsed[5], nmeaParsed[6], nmeaParsed[7]] : '',
                    elevations: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? [nmeaParsed[8], nmeaParsed[9], nmeaParsed[10], nmeaParsed[11]] : '',
                    azimuth: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? [nmeaParsed[12], nmeaParsed[13], nmeaParsed[14], nmeaParsed[15]] : '',
                    signalStrengths: (nmeaParsed[0] !== null && nmeaParsed[16] !== undefined && nmeaParsed[16] !== '') ? [nmeaParsed[16], nmeaParsed[17], nmeaParsed[18], lastItem[0]] : ''
                }
            } else if (nmeaParsed[0].includes("RMC")) {
                var lastItem = (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? nmeaParsed[12].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                    status: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                    latitude: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? DMLatToDD(nmeaParsed[4], nmeaParsed[3]) : 0,
                    latitudeDirection: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                    longitude: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? DMLongToDD(nmeaParsed[6], nmeaParsed[5]) : 0,
                    longitudeDirection: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                    speed: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                    course: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(nmeaParsed[8]) : 0,
                    date: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? Number(nmeaParsed[9]) : 0,
                    magneticVariation: (nmeaParsed[10] !== null && nmeaParsed[10] !== undefined && nmeaParsed[10] !== '') ? parseFloat(nmeaParsed[10]) : 0,
                    magneticVariationDirection: (nmeaParsed[11] !== null && nmeaParsed[11] !== undefined && nmeaParsed[11] !== '') ? nmeaParsed[10] : '',
                    positionMode: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? lastItem[0] : ''
                }
            } else if (nmeaParsed[0].includes("VTG")) {
                var lastItem = (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? nmeaParsed[9].split('*') : '';
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    courseOverGround: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? parseFloat(nmeaParsed[1]) : 0,
                    fixedField: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                    courseOverGroundMagnetic: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                    fixedFieldMagnetic: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                    speedOverGround: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                    fixedFieldKnots: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                    speedOverGroundMetric: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                    fixedFieldKMH: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8] : '',
                    positionMode: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? lastItem[0] : ''
                }
            } else if (nmeaParsed[0].includes("ZDA")) {
                var lastItem = (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6].split('*') : 0;
                parsedSentence = {
                    type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                    time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                    day: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? Number(nmeaParsed[2]) : 0,
                    month: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? Number(nmeaParsed[3]) : 0,
                    year: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? Number(nmeaParsed[4]) : 0,
                    localTimeHours: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? Number(nmeaParsed[5]) : 0,
                    localTimeMinutes: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? Number(lastItem[0]) : 0
                }
            }
            return parsedSentence;
        } else {
            return "Invalid NMEA sentence."
        }
    }
    // Parses DTM string
    export function parseDTM(sentence: string, unit: string): DTM {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: DTM;
            var lastItem = (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                datum: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1] : '',
                subDatum: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                latitudeOffset: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                latitudeDirection: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                longitudeOffset: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                longitudeDirection: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                altitudeOffset: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                refDatum: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? lastItem[0] : ''
            }
            return parsedSentence;
        }
    }
    // Parses GBS string
    export function parseGBS(sentence: string, unit: string): GBS {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GBS;
            var lastItem = (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8].split('*') : 0;
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                latitudeError: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                longitudeError: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                altitudeError: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? parseFloat(nmeaParsed[4]) : 0,
                failedSatelliteID: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                probability: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? parseFloat(nmeaParsed[6]) : 0,
                bias: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                standardDeviationOfBias: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(lastItem[0]) : 0
            }
            return parsedSentence;
        }
    }
    // Parses GGA string
    export function parseGGA(sentence: string, unit: string): GGA {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GGA;
            var lastItem = (nmeaParsed[14] !== null && nmeaParsed[14] !== undefined && nmeaParsed[14] !== '') ? nmeaParsed[14].split('*') : 0;
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                latitude: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? DMLatToDD(nmeaParsed[3], nmeaParsed[2]) : 0,
                latitudeDirection: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? nmeaParsed[3] : '',
                longitude: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? DMLongToDD(nmeaParsed[5], nmeaParsed[4]) : 0,
                longitudeDirection: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? nmeaParsed[5] : '',
                quality: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? parseFloat(nmeaParsed[6]) : 0,
                satelliteCount: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                HDOP: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(nmeaParsed[8]) : 0,
                altitude: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? convertAlt(nmeaParsed[9], unit) : 0,
                altitudeUnits: (nmeaParsed[10] !== null && nmeaParsed[10] !== undefined && nmeaParsed[10] !== '') ? nmeaParsed[10] : '',
                GeoidSeparation: (nmeaParsed[11] !== null && nmeaParsed[11] !== undefined && nmeaParsed[11] !== '') ? parseFloat(nmeaParsed[11]) : 0,
                GeoidSeparationUnits: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? nmeaParsed[12] : '',
                ageOfDifferential: (nmeaParsed[13] !== null && nmeaParsed[13] !== undefined && nmeaParsed[13] !== '') ? parseFloat(nmeaParsed[13]) : 0,
                ageOfDifferentialStation: (nmeaParsed[14] !== null && nmeaParsed[14] !== undefined && nmeaParsed[14] !== '') ? parseFloat(lastItem[0]) : 0
            }
            return parsedSentence;
        }
    }
    // Parses GLL string
    export function parseGLL(sentence: string, unit: string): GLL {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GLL;
            var lastItem = (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? nmeaParsed[7].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                latitude: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? DMLatToDD(nmeaParsed[2], nmeaParsed[1]) : 0,
                latitudeDirection: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                longitude: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? DMLongToDD(nmeaParsed[4], nmeaParsed[3]) : 0,
                longitudeDirection: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                time: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? Number(nmeaParsed[5]) : 0,
                status: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                positionMode: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? lastItem[7] : ''
            }
            return parsedSentence;
        }
    }
    // Parses GLQ string
    export function parseGLQ(sentence: string, unit: string): GLQ {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GLQ;
            var lastItem = (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                messageID: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? lastItem[0] : ''
            }
            return parsedSentence;
        }
    }
    // Parses GNQ string
    export function parseGNQ(sentence: string, unit: string): GNQ {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GNQ;
            var lastItem = (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                messageID: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? lastItem[0] : ''
            }
            return parsedSentence;
        }
    }
    // Parses GNS string
    export function parseGNS(sentence: string, unit: string): GNS {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GNS;
            var lastItem = (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? nmeaParsed[12].split('*') : 0;
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                latitude: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? DMLatToDD(nmeaParsed[3], nmeaParsed[2]) : 0,
                latitudeDirection: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? nmeaParsed[3] : '',
                longitude: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? DMLongToDD(nmeaParsed[5], nmeaParsed[4]) : 0,
                longitudeDirection: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? nmeaParsed[5] : '',
                positionMode: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                satelliteCount: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                HDOP: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(nmeaParsed[8]) : 0,
                altitude: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? parseFloat(nmeaParsed[9]) : 0,
                GeoidSeparation: (nmeaParsed[10] !== null && nmeaParsed[10] !== undefined && nmeaParsed[10] !== '') ? parseFloat(nmeaParsed[10]) : 0,
                ageOfDifferential: (nmeaParsed[11] !== null && nmeaParsed[11] !== undefined && nmeaParsed[11] !== '') ? parseFloat(nmeaParsed[11]) : 0,
                ageOfDifferentialStation: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? parseFloat(lastItem[0]) : 0
            }
            return parsedSentence;
        }
    }
    // Parses GPQ string
    export function parseGPQ(sentence: string, unit: string): GPQ {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GPQ;
            var lastItem = (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                messageID: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? lastItem[0] : ''
            }
            return parsedSentence;
        }
    }
    // Parses GRS string
    export function parseGRS(sentence: string, unit: string): GRS {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GRS;
            var lastItem = (nmeaParsed[14] !== null && nmeaParsed[14] !== undefined && nmeaParsed[14] !== '') ? nmeaParsed[14].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                mode: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                residual: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? [nmeaParsed[3], nmeaParsed[4], nmeaParsed[5], nmeaParsed[6], nmeaParsed[7], nmeaParsed[8], nmeaParsed[9], nmeaParsed[10], nmeaParsed[11], nmeaParsed[12], nmeaParsed[13], lastItem[0]] : ''
            }
            return parsedSentence;
        }
    }
    // Parses GSA string
    export function parseGSA(sentence: string, unit: string): GSA {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GSA;
            var lastItem = (nmeaParsed[17] !== null && nmeaParsed[17] !== undefined && nmeaParsed[17] !== '') ? nmeaParsed[17].split('*') : 0;
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                operationMode: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? nmeaParsed[1] : '',
                navigationMode: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                satelliteNumber: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? [nmeaParsed[3], nmeaParsed[4], nmeaParsed[5], nmeaParsed[6], nmeaParsed[7], nmeaParsed[8], nmeaParsed[9], nmeaParsed[10], nmeaParsed[11], nmeaParsed[12], nmeaParsed[13], nmeaParsed[14]] : '',
                PDOP: (nmeaParsed[15] !== null && nmeaParsed[15] !== undefined && nmeaParsed[15] !== '') ? parseFloat(nmeaParsed[15]) : 0,
                HDOP: (nmeaParsed[16] !== null && nmeaParsed[16] !== undefined && nmeaParsed[16] !== '') ? parseFloat(nmeaParsed[16]) : 0,
                VDOP: (nmeaParsed[17] !== null && nmeaParsed[17] !== undefined && nmeaParsed[17] !== '') ? parseFloat(lastItem[0]) : 0
            }
            return parsedSentence;
        }
    }
    // Parses GST string
    export function parseGST(sentence: string, unit: string): GST {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GST;
            var lastItem = (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8].split('*') : 0;
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                rangeRMS: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                stdMajor: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                stdMinor: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? parseFloat(nmeaParsed[4]) : 0,
                orientation: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                stdLatitudeError: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? parseFloat(nmeaParsed[6]) : 0,
                stdLongitudeError: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                stdAltitudeError: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(lastItem[0]) : 0
            }
            return parsedSentence;
        }
    }
    // Parses GSV string
    export function parseGSV(sentence: string, unit: string): GSV {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: GSV;
            var lastItem = (nmeaParsed[19] !== null && nmeaParsed[19] !== undefined && nmeaParsed[19] !== '') ? nmeaParsed[19].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                numberOfMessages: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? parseFloat(nmeaParsed[1]) : 0,
                messageNumber: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? parseFloat(nmeaParsed[2]) : 0,
                satellitesInView: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                satelliteIDs: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? [nmeaParsed[4], nmeaParsed[5], nmeaParsed[6], nmeaParsed[7]] : '',
                elevations: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? [nmeaParsed[8], nmeaParsed[9], nmeaParsed[10], nmeaParsed[11]] : '',
                azimuth: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? [nmeaParsed[12], nmeaParsed[13], nmeaParsed[14], nmeaParsed[15]] : '',
                signalStrengths: (nmeaParsed[0] !== null && nmeaParsed[16] !== undefined && nmeaParsed[16] !== '') ? [nmeaParsed[16], nmeaParsed[17], nmeaParsed[18], lastItem[0]] : ''
            }
            return parsedSentence;
        }
    }
    // Parses RMC string
    export function parseRMC(sentence: string, unit: string): RMC {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: RMC;
            var lastItem = (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? nmeaParsed[12].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                status: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                latitude: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? DMLatToDD(nmeaParsed[4], nmeaParsed[3]) : 0,
                latitudeDirection: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                longitude: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? DMLongToDD(nmeaParsed[6], nmeaParsed[5]) : 0,
                longitudeDirection: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                speed: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                course: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? parseFloat(nmeaParsed[8]) : 0,
                date: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? Number(nmeaParsed[9]) : 0,
                magneticVariation: (nmeaParsed[10] !== null && nmeaParsed[10] !== undefined && nmeaParsed[10] !== '') ? parseFloat(nmeaParsed[10]) : 0,
                magneticVariationDirection: (nmeaParsed[11] !== null && nmeaParsed[11] !== undefined && nmeaParsed[11] !== '') ? nmeaParsed[10] : '',
                positionMode: (nmeaParsed[12] !== null && nmeaParsed[12] !== undefined && nmeaParsed[12] !== '') ? lastItem[0] : ''
            }
            return parsedSentence;
        }
    }
    // Parses VTG string
    export function parseVTG(sentence: string, unit: string): VTG {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: VTG;
            var lastItem = (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? nmeaParsed[9].split('*') : '';
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                courseOverGround: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? parseFloat(nmeaParsed[1]) : 0,
                fixedField: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? nmeaParsed[2] : '',
                courseOverGroundMagnetic: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? parseFloat(nmeaParsed[3]) : 0,
                fixedFieldMagnetic: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? nmeaParsed[4] : '',
                speedOverGround: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? parseFloat(nmeaParsed[5]) : 0,
                fixedFieldKnots: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6] : '',
                speedOverGroundMetric: (nmeaParsed[7] !== null && nmeaParsed[7] !== undefined && nmeaParsed[7] !== '') ? parseFloat(nmeaParsed[7]) : 0,
                fixedFieldKMH: (nmeaParsed[8] !== null && nmeaParsed[8] !== undefined && nmeaParsed[8] !== '') ? nmeaParsed[8] : '',
                positionMode: (nmeaParsed[9] !== null && nmeaParsed[9] !== undefined && nmeaParsed[9] !== '') ? lastItem[0] : ''
            }
            return parsedSentence;
        }
    }
    // Parses ZDA string
    export function parseZDA(sentence: string, unit: string): ZDA {
        if (sentence !== undefined && sentence !== null) {
            var nmea = sentence.toString();
            var nmeaParsed = nmea.split(",");
            var parsedSentence: ZDA;
            var lastItem = (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? nmeaParsed[6].split('*') : 0;
            parsedSentence = {
                type: (nmeaParsed[0] !== null && nmeaParsed[0] !== undefined && nmeaParsed[0] !== '') ? nmeaParsed[0] : '',
                time: (nmeaParsed[1] !== null && nmeaParsed[1] !== undefined && nmeaParsed[1] !== '') ? Number(nmeaParsed[1]) : 0,
                day: (nmeaParsed[2] !== null && nmeaParsed[2] !== undefined && nmeaParsed[2] !== '') ? Number(nmeaParsed[2]) : 0,
                month: (nmeaParsed[3] !== null && nmeaParsed[3] !== undefined && nmeaParsed[3] !== '') ? Number(nmeaParsed[3]) : 0,
                year: (nmeaParsed[4] !== null && nmeaParsed[4] !== undefined && nmeaParsed[4] !== '') ? Number(nmeaParsed[4]) : 0,
                localTimeHours: (nmeaParsed[5] !== null && nmeaParsed[5] !== undefined && nmeaParsed[5] !== '') ? Number(nmeaParsed[5]) : 0,
                localTimeMinutes: (nmeaParsed[6] !== null && nmeaParsed[6] !== undefined && nmeaParsed[6] !== '') ? Number(lastItem[0]) : 0
            }
            return parsedSentence;
        }
    }
    // Convert altitude
    export function convertAlt(altitude: string, unit: string): number {
        var alt = parseFloat(altitude);
        var calAlt;
        if (unit == 'imp') {
            calAlt = Math.round(alt * 3.28084);
        } else {
            calAlt = Math.round(alt);
        }
        return calAlt;
    }
    // Converts ddmm.mmmmm to decimal degrees
    export function DMToDD(latitudeDirection: string, latitude: string, longitudeDirection: string, longitude: string): DD {
        var lat = parseFloat(latitude);
        var latDirection = latitudeDirection;
        var long = parseFloat(longitude);
        var longDirection = longitudeDirection;

        var degreesLatitude = Math.floor(lat / 100.0);
        var minutesLatitude = lat - (degreesLatitude * 100.0);
        var decimalDegreesLatitude = degreesLatitude + (minutesLatitude / 60.0);
        if (latDirection == 'S') {
            decimalDegreesLatitude = decimalDegreesLatitude * -1;
        }
        var degreesLongitude = Math.floor(long / 100.0);
        var minutesLongitude = long - (degreesLongitude * 100.0);
        var decimalDegreesLongitude = degreesLongitude + (minutesLongitude / 60.0);
        if (longDirection == 'W') {
            decimalDegreesLongitude = decimalDegreesLongitude * -1;
        }
        var dd: DD;
        dd = {
            latitude: decimalDegreesLatitude,
            longitude: decimalDegreesLongitude
        }
        return dd;
    }
    // Converts latitude ddmm.mmmmm to decimal degrees
    export function DMLatToDD(latitudeDirection: string, latitude: string): number {
        var lat = parseFloat(latitude);
        var latDirection = latitudeDirection;

        var degreesLatitude = Math.floor(lat / 100.0);
        var minutesLatitude = lat - (degreesLatitude * 100.0);
        var decimalDegreesLatitude = degreesLatitude + (minutesLatitude / 60.0);
        if (latDirection == 'S') {
            decimalDegreesLatitude = decimalDegreesLatitude * -1;
        }

        return decimalDegreesLatitude;
    }
    // Converts longitude ddmm.mmmmm to decimal degrees
    export function DMLongToDD(longitudeDirection: string, longitude: string): number {
        var long = parseFloat(longitude);
        var longDirection = longitudeDirection;

        var degreesLongitude = Math.floor(long / 100.0);
        var minutesLongitude = long - (degreesLongitude * 100.0);
        var decimalDegreesLongitude = degreesLongitude + (minutesLongitude / 60.0);
        if (longDirection == 'W') {
            decimalDegreesLongitude = decimalDegreesLongitude * -1;
        }

        return decimalDegreesLongitude;
    }
    // Calculate horizontal accuracy
    // Must pass latitude and longitude error which comes from GST or similar sentence
    // Note this calculation may vary between gps units
    export function horizontalAccuracy(latitudeError: number, longitudeError: number, unit: string): number {
        var latError = Math.pow(Number(latitudeError), 2);
        var longError = Math.pow(Number(longitudeError), 2);
        var totalError = latError + longError;
        var accuracy = Math.sqrt(totalError);
        var accuracyUnit;
        if (unit == 'imp') {
            accuracyUnit = accuracy * 3.28084;
        } else if (unit == 'm') {
            accuracyUnit = accuracy;
        }
        var accuracyFixed = accuracyUnit.toFixed(1);
        var accuracyNumber = parseFloat(accuracyFixed);
        return accuracyNumber;
    }
    // Converts Latitude DD to DMS.
    export function DDLatToDMS(latitude: number): string {
        var lat = latitude;
        var latResult;
        latResult = calculateDMS(lat);
        latResult += (lat >= 0) ? 'N' : 'S';
        return latResult;
    }
    // Converts Longitude DD to DMS.
    export function DDLongToDMS(longitude: number): string {
        var long = longitude;
        var lngResult;
        lngResult = calculateDMS(long);
        lngResult += (long >= 0) ? 'E' : 'W';
        return lngResult;
    }
    // Calculates degrees minutes seconds
    export function calculateDMS(degrees: number): string {
        var valDeg, valMin, valSec, result;
        degrees = Math.abs(degrees);
        valDeg = Math.floor(degrees);
        result = valDeg + "° ";
        valMin = Math.floor((degrees - valDeg) * 60);
        result += valMin + "' ";
        valSec = Math.round((degrees - valDeg - valMin / 60) * 3600 * 1000) / 1000;
        result += valSec + '" ';
        return result;
    }
    // Converts DMS to DD
    export function DMSToDD(dms: string): number {
        var dmsAsString = dms.toString();
        var dmsString = dmsAsString.split(" ");
        var result = calculateDD(dmsString);
        return result;
    }
    // Calculates decimal degrees from degrees minutes seconds
    export function calculateDD(dmsArray: string[]): number {
        var valDeg, valMin, valSec, result;
        valDeg = parseFloat(dmsArray[0].replace("°", ""));
        valMin = parseFloat(dmsArray[1].replace("' ", ""));
        valSec = parseFloat(dmsArray[2].replace('" ', ''));
        result = (valSec / 3600) + (valMin / 60) + valDeg;
        if (dmsArray[3] === 'W' || dmsArray[3] === 'S') {
            result = result * -1;
        }
        return result;
    }
    // Calculates distance between two points
    export function calculateDistance(point1Latitude: number, point1Longitude: number, point2Latitude: number, point2Longitude: number, unit: string): number {
        var radlat1 = Math.PI * point1Latitude / 180;
        var radlat2 = Math.PI * point2Latitude / 180;
        var theta = point1Longitude - point2Longitude;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "m") { dist = dist * 1.609344 }
        return dist;
    }
    // Interfaces
    export interface DD {
        latitude: number;
        longitude: number;
    }
    export interface DTM {
        type: string;
        datum: string;
        subDatum: string;
        latitudeOffset: number;
        latitudeDirection: string;
        longitudeOffset: number;
        longitudeDirection: string;
        altitudeOffset: number;
        refDatum: string;
    }
    export interface GBS {
        type: string;
        time: number;
        latitudeError: number;
        longitudeError: number;
        altitudeError: number;
        failedSatelliteID: number;
        probability: number;
        bias: number;
        standardDeviationOfBias: number;
    }
    export interface GGA {
        type: string;
        time: number;
        latitude: number;
        latitudeDirection: string;
        longitude: number;
        longitudeDirection: string;
        quality: number;
        satelliteCount: number;
        HDOP: number;
        altitude: number;
        altitudeUnits: string;
        GeoidSeparation: number;
        GeoidSeparationUnits: string;
        ageOfDifferential: number;
        ageOfDifferentialStation: number;
    }
    export interface GLL {
        type: string;
        latitude: number;
        latitudeDirection: string;
        longitude: number;
        longitudeDirection: string;
        time: number;
        status: string;
        positionMode: string;
    }
    export interface GLQ {
        type: string;
        messageID: string;
    }
    export interface GNQ {
        type: string;
        messageID: string;
    }
    export interface GNS {
        type: string;
        time: number;
        latitude: number;
        latitudeDirection: string;
        longitude: number;
        longitudeDirection: string;
        positionMode: string;
        satelliteCount: number;
        HDOP: number;
        altitude: number;
        GeoidSeparation: number;
        ageOfDifferential: number;
        ageOfDifferentialStation: number;
    }
    export interface GPQ {
        type: string;
        messageID: string;
    }
    export interface GRS {
        type: string;
        time: number;
        mode: number;
        residual: string | string[];
    }
    export interface GSA {
        type: string;
        operationMode: string;
        navigationMode: number;
        satelliteNumber: string | string[];
        PDOP: number;
        HDOP: number;
        VDOP: number;
    }
    export interface GST {
        type: string;
        time: number;
        rangeRMS: number;
        stdMajor: number;
        stdMinor: number;
        orientation: number;
        stdLatitudeError: number;
        stdLongitudeError: number;
        stdAltitudeError: number;
    }
    export interface GSV {
        type: string;
        numberOfMessages: number;
        messageNumber: number;
        satellitesInView: number;
        satelliteIDs: string | string[];
        elevations: string | string[];
        azimuth: string | string[];
        signalStrengths: string | string[];
    }
    export interface RMC {
        type: string;
        time: number;
        status: string;
        latitude: number;
        latitudeDirection: string;
        longitude: number;
        longitudeDirection: string;
        speed: number;
        course: number;
        date: number;
        magneticVariation: number;
        magneticVariationDirection: string;
        positionMode: string;
    }
    export interface VTG {
        type: string;
        courseOverGround: number;
        fixedField: string;
        courseOverGroundMagnetic: number;
        fixedFieldMagnetic: string;
        speedOverGround: number;
        fixedFieldKnots: string;
        speedOverGroundMetric: number;
        fixedFieldKMH: string;
        positionMode: string;
    }
    export interface ZDA {
        type: string;
        time: number;
        day: number;
        month: number;
        year: number;
        localTimeHours: number;
        localTimeMinutes: number;
    }

}



