const DISTANCE = 500;

class geoCalculator {
    getAllValidPolls(listOfPolls, lat, long) {
        if (lat && long) {
            var validPolls = [];
            listOfPolls.forEach(poll => {
                if (this.validDistance(poll, lat, long)) {
                    validPolls.push(poll);
                }
            });
            return validPolls;
        }
        else {
            throw "Latitude or Longitude parameter is not valid";
        }
    }

    validDistance(poll, lat, long) {
        var d = this.getDistanceBetweenPoints(poll.latitude, poll.longitude, lat, long);
        return (d <= DISTANCE);
    }

    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    getDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.degreeToRad(lat2-lat1);
        var dLon = this.degreeToRad(lon2-lon1);
        var a = 
            (Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.degreeToRad(lat1)) * Math.cos(this.degreeToRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        d = d*1000 // distance in m
        return d;
    }

    degreeToRad(deg) {
        return deg * (Math.PI/180);
    }
}

module.exports = geoCalculator;