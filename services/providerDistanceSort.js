const request = require("request");

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=YOUR_API_KEY`, //TODO put API key here
        json: true,
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect to Google servers.");
        } else if (body.status === "ZERO_RESULTS") {
          reject("Unable to find that address.");
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng,
          });
        }
      }
    );
  });
};

const sortProvidersByDistance = async (userAddress, providerAddresses) => {
  const userCoords = await geocodeAddress(userAddress);
  const providerCoords = await Promise.all(
    providerAddresses.map((address) => geocodeAddress(address))
  );
  //maybe geocode when providers uploaded right away.

  // Calculate the distances between the user and each provider using the Haversine formula
  providerCoords.forEach((providerCoord) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(providerCoord.latitude - userCoords.latitude);
    const dLng = deg2rad(providerCoord.longitude - userCoords.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(userCoords.latitude)) *
        Math.cos(deg2rad(providerCoord.latitude)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    providerCoord.distance = d;
  });

  // Sort the providers by distance
  providerCoords.sort((a, b) => a.distance - b.distance);

  // Return the sorted array of provider addresses
  return providerCoords.map((providerCoord) => providerCoord.address);
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
