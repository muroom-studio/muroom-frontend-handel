export const compareCoords = (
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number },
) => {
  const EPSILON = 0.0001;

  if (!pos1 || !pos2) return false;

  return (
    Math.abs(pos1.lat - pos2.lat) < EPSILON &&
    Math.abs(pos1.lng - pos2.lng) < EPSILON
  );
};
