export const degree = magnetometer => {
  return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
};

export const angle = magnetometer => {
  if (magnetometer) {
    let { x, y, z } = magnetometer;

    // var __angle = 0;
    // if (Math.atan2(y, x) >= 0) {
    //   __angle = Math.atan2(y, x) * (180 / Math.PI);
    // } else {
    //   __angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    // }
  }

  return Math.round((Math.atan2(x, -y) * 180) / Math.PI);
};

export default { angle, degree };
