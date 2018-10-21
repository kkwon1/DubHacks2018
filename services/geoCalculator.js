const DISTANCE = 500000;

class geoCalculator {
    getAllValidPolls(listOfPolls, lat, long) {
        var validPolls = [];
        listOfPolls.forEach(poll => {
            if (this.validDistance(poll, lat, long)) {
                validPolls.push(poll);
            }
        });
        return validPolls;
    }

    validDistance(poll, lat, long) {
        var firstPoint, secondPoint;
        
        firstPoint.lat = poll.latitude;
        firstPoint.lon = poll.longitude;
        secondPoint.lat = lat
        secondPoint.lon = long;

        var d = this.getDistanceBetweenPoints(firstPoint, secondPoint);
        return (d <= DISTANCE);
    }
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    getDistanceBetweenPoints(firstPoint, secondPoint) {
        var lat1 = firstPoint.lat;
        var lon1 = firstPoint.lon;
        var lat2 = secondPoint.lat;
        var lon2 = secondPoint.lon;
        var R = 6371; // Radius of the earth in km
        var dLat = degreeToRad(lat2-lat1);
        var dLon = degreeToRad(lon2-lon1); 
        var a = 
            (Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(degreeToRad(lat1)) * Math.cos(degreeToRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        d = d*1000 // distance in m
        return d;
    }

    degreeToRad(deg) {
        return deg * (Math.PI/180)
    }
}

  


module.exports = geoCalculator;