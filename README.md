# location-utilities
Coordinate formatting, location calculation utilities, and NMEA sentence parser.

This module provides many useful functions:
- Formats ddmm.mmmmm or degrees minutes as DD or decimal degrees. 
- Formats decimal degrees or DD as degrees minutes seconds or DMS.
- Formats DMS or degrees minutes seconds as DD or decimal degrees. 
- Calculates horizontal accuracy which is the accuracy output on most GPS devices.
- Calculates the distance between two points.
- Parses all standard sentences of the NMEA protocol which includes $GPDTM, $GPGBS, $GPGGA, $GPGLL, $GPGLQ, $GPGNQ, $GPGNS, $GPGPQ, $GPGRS, $GPGSA, 
  $GPGST, $GPGSV, $GPRMC, $GPVTG, and $GPZDA. 
- Supports metric and imperial units.

## Love my modules?
- Support my continued creation of important modules. Buy me a glass of bourbon!
https://www.paypal.me/buymebourbon

## Installation
```sh
npm install location-utilities --save
```
Have fun and buy me a bourbon! https://www.paypal.me/buymebourbon
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
// Unit is either m for metric or imp for imperial
// Measurements are returned in meters or feet
LocationUtility.parseNMEA(NMEASentence, unit);
```
##### Parse NMEA sentence with an interface
```ts
// Returns an object with the parsed data and casts it to a NMEA sentence interface
LocationUtility.parseNMEA(NMEASentence, 'imp') as LocationUtility.GGA;
```
#### Parse specific NMEA sentence
```ts
// Supports all standard NMEA sentences as parse functions
// Replace GGA with the name of the sentence you are trying to parse
// Measurements are returned in meters or feet
LocationUtility.parseGGA(NMEASentence, 'imp');
```
#### Calculate horizontal accuracy
```ts
// Returns horizontal accuracy as a number
// Unit is either m for metric or imp for imperial
// Measurements are returned in meters or feet
  let parsedGST = LocationUtility.parseGST(NMEAGSTSentence, 'imp');
  LocationUtility.horizontalAccuracy(parsedGST.stdLatitudeError, parsedGST.stdLongitudeError, 'imp');
```
#### Format degrees minutes as decimal degrees 
```ts
// Returns an object containing decimal degrees for both latitude and longitude
// Latitude direction is either N for North or S for South
// Longitude direction is either E for East or W for west
  LocationUtility.DMToDD(latitudeDirection, latitude, longitudeDirection, longitude);
```
#### Format latitude degrees minutes as decimal degrees
```ts
// Returns decimal degrees for latitude as a number
// Latitude direction is either N for North or S for South
// Longitude direction is either E for East or W for west
  LocationUtility.DMLatToDD(latitudeDirection, latitude);
```
#### Format longitude degrees minutes as decimal degrees
```ts
// Returns decimal degrees for longitude as a number
// Latitude direction is either N for North or S for South
// Longitude direction is either E for East or W for west
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
#### Format degrees minutes seconds as decimal degrees
```ts
// Returns decimal degrees as a number
// Looks for strings in this format: 138° 31' 50" E
  LocationUtility.DMSToDD(longitude);
```
#### Calculate distance between two points
```ts
// Returns the distance in the desired unit
// Unit is either m for metric or imp for imperial
// Measurements are returned in kilometers or miles
  LocationUtility.calculateDistance(point1Latitude, point1Longitude, point2Latitude, point2Longitude, unit);
```