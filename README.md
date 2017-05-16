# location-utilities
Coordinate formatting and location calculation utilities

This module fills the gap when it comes to understanding GPS units and reading NMEA sentences. Also, this module formats sentences from NMEA into a 
readable format. It can format latitude and longitude in many ways:
- ddmm.mmmmm or degrees minutes to DMS or degrees minutes seconds. 
- decimal degrees or DD to degrees minutes seconds or DMS.
- DMS or degrees minutes seconds to DD or decimal degrees. 
The module can also calculate horizontal accuracy which is used for the accuracy reading on most GPS units
The module also includes interfaces for every single standard NMEA sentence. 

This module is still in development, because I am adding coordinate calculation, more specific NMEA parsing functions, and the rest of the NMEA interfaces.
Units must be passed to determine the formatting. Pass 'imp' for imperial and 'm' for metric

How to use it within an Angular typescript project:
```
import { Component } from "@angular/core";
import { LocationUtility } from 'location-utilities';

@Component({
   templateURL: 'mypage.html'
})

export class MyPage{

constructor(){}

// Example methods included with the module
getGST(NMEAGSTSentence: string){
// Parts of the GST sentence are used to calculate horizontal accuracy
// A parse function exists for every single standard NMEA sentence
   let parsedGST = LocationUtility.parseGST(NMEAGSTSentence, 'imp');
   let accuracy = LocationUtility.horizontalAccuracy(parsedGST.stdLatitudeError, parsedGST.stdLongitudeError, 'imp');
   return accuracy; 
}

parseNMEA(NMEASentence: string){
// Pass any NMEA sentence to this function then typecast it as the interface you need or get the parsed NMEA sentence
   let parsedSentence = LocationUtility.parseNMEA(NMEASentence, 'imp') as LocationUtility.GGA;
   let latitude = parsedSentence.latitude;
   return latitude; 
}

formatDM(latitudeDirection: string, latitude: string, longitudeDirection: string, longitude: string) {
// Pass Degrees minutes and get back an object with the decimal degrees
  let coordinatesDecimalDegrees = LocationUtility.DMToDD(latitudeDirection, latitude, longitudeDirection, longitude);
  return coordinatesDecimalDegrees;
}

formatDMLat(latitudeDirection: string, latitude: string){
// Formats latitude from degrees minutes to decimal degrees
  let coordinatesDecimalDegrees = LocationUtility.DMLatToDD(latitudeDirection, latitude);
  return coordinatesDecimalDegrees;
}

formatDMLong(longitudeDirection: string, longitude: string){
// Formats longitude from degrees minutes to decimal degrees
  let coordinatesDecimalDegrees = LocationUtility.DMLongToDD(longitudeDirection, longitude);
  return coordinatesDecimalDegrees;
}

formatDDLat(latitude: number){
// Formats latitude from decimal degrees to degrees minutes seconds
  let coordinatesinDMS = LocationUtility.DDLatToDMS(latitude);
  return coordinatesinDMS;
}

formatDDLong(longitude: number){
// Formats longitude from decimal degrees to degrees minutes seconds
  let coordinatesinDMS = LocationUtility.DDLongToDMS(longitude);
  return coordinatesinDMS;
}
}
```
