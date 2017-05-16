# location-utilities
Coordinate formatting, location calculation utilities, and NMEA parser.

This module provides many useful functions:
- Formats ddmm.mmmmm or degrees minutes as DD or decimal degrees. 
- Formats decimal degrees or DD as degrees minutes seconds or DMS.
- Formats DMS or degrees minutes seconds as DD or decimal degrees. 
- Calculates horizontal accuracy which is the accuracy output on most GPS devices.
- Parses all standard sentences of the NMEA protocol which includes $GPDTM, $GPGBS, $GPGGA, $GPGLL, $GPGLQ, $GPGNQ, $GPGNS, $GPGPQ, $GPGRS, $GPGSA, 
  $GPGST, $GPGSV, $GPRMC, $GPVTG, and $GPZDA. 
- Supports metric and imperial units.

## Installation
```sh
npm install location-utilities --save
```

## Node usage
```js
var LocationUtility =  require('path-to-module-index-file/index.js');
```
## Angular Typescript usage
``` ts
import { LocationUtility } from 'location-utilities';
```

## Current module functions

#### Returned Unit of Measure
```ts
// Pass 'imp' for imperial and 'm' for metric
```
#### Parse NMEA sentence
```ts
// Returns an object with the parsed data
LocationUtility.parseNMEA(NMEASentence, 'imp');
```
##### Parse NMEA sentence with an interface
```ts
// Returns an object with the parsed data and casts it to a NMEA sentence interface
LocationUtility.parseNMEA(NMEASentence, 'imp') as LocationUtility.GGA;
```
#### Parse specific NMEA sentence
```ts
// Supports all standard NMEA sentences as parse functions
// Replace GGA with the sentence you are trying to parse
LocationUtility.parseGGA(NMEASentence, 'imp');
```
#### Calculate horizontal accuracy
```ts
// Returns horizontal accuracy as a number
  let parsedGST = LocationUtility.parseGST(NMEAGSTSentence, 'imp');
  LocationUtility.horizontalAccuracy(parsedGST.stdLatitudeError, parsedGST.stdLongitudeError, 'imp');
```
#### Format degrees minutes as decimal degrees 
```ts
// Returns an object containing decimal degrees for both latitude and longitude
  LocationUtility.DMToDD(latitudeDirection, latitude, longitudeDirection, longitude);
```
#### Format latitude degrees minutes as decimal degrees
```ts
// Returns decimal degrees for latitude as a number
  LocationUtility.DMLatToDD(latitudeDirection, latitude);
```
#### Format longitude degrees minutes as decimal degrees
```ts
// Returns decimal degrees for longitude as a number
  LocationUtility.DMLongToDD(longitudeDirection, longitude);
```
#### Format latitude decimal degrees as degrees minutes seconds
```ts
// Returns degrees minutes seconds for latitude as a string
  LocationUtility.DDLatToDMS(latitude);
```
#### Format longitude decimal degrees as degrees minutes seconds
```ts
// Returns degrees minutes seconds for longitude as a string
  LocationUtility.DDLongToDMS(longitude);
```