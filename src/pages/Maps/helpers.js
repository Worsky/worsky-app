import { PermissionsAndroid } from "react-native";

export async function centerMapOnMe(latitude, longitude) {
  try {
    if (follow) setFollow(false);

    await mapCamera.moveTo([longitude, latitude], 1200);

    setFollow(true);
  } catch (error) {
    setFollow(true);
  }
}

export async function dispatchAndVerifyPermissions() {
  const fine = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  const coarse = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  );

  !fine &&
    (await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Worsky Fine Location Permission",
        message: "Fine Location",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    ));

  !coarse &&
    (await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Worsky Coarse Location Permission",
        message: "Coarse Location",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    ));
}

export function errorMarginToDisplayTargetIcon(screenCoord, userCoord) {
  const { _longitude, _latitude } = screenCoord;

  const _longitudeFormated = Number(_longitude.toFixed(4));
  const _latitudeFormated = Number(_latitude.toFixed(4));

  const { longitude, latitude } = userCoord;

  const longitudeFormated = Number(longitude.toFixed(4));
  const latitudeFormated = Number(latitude.toFixed(4));

  const result = { followLatitude: true, followLongitude: true };

  if (_latitudeFormated != latitudeFormated) {
    let addNumber = 0.0005;

    if (Math.sign(_latitudeFormated) == -1) addNumber = -0.0005;

    const difference = (_latitudeFormated - latitudeFormated).toFixed(4);

    if (difference <= addNumber) result.followLatitude = false;
  }

  if (_longitudeFormated != longitudeFormated) {
    let addNumber = 0.0005;

    if (Math.sign(_longitudeFormated) == -1) addNumber = -0.0005;

    const difference = (_longitudeFormated - longitudeFormated).toFixed(4);

    if (difference <= addNumber) result.followLongitude = false;
  }

  if (!result.followLatitude || !result.followLongitude) return false;

  return true;
}
