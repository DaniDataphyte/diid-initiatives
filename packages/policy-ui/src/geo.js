export function mercatorProjection(features, width, height, padding) {
  const points = [];

  const pushCoords = (coords) => {
    coords.forEach((coord) => {
      if (Array.isArray(coord[0])) {
        pushCoords(coord);
      } else {
        const lon = (coord[0] * Math.PI) / 180;
        const lat = Math.max(Math.min(coord[1], 85), -85);
        const latRad = (lat * Math.PI) / 180;
        const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
        points.push([lon, y]);
      }
    });
  };

  features.forEach((feature) => {
    pushCoords(feature.geometry.coordinates);
  });

  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min(
    (width - padding * 2) / (maxX - minX),
    (height - padding * 2) / (maxY - minY)
  );

  return ([lonDeg, latDeg]) => {
    const lon = (lonDeg * Math.PI) / 180;
    const lat = Math.max(Math.min(latDeg, 85), -85);
    const latRad = (lat * Math.PI) / 180;
    const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2));

    return [
      (lon - minX) * scale + padding,
      (maxY - y) * scale + padding
    ];
  };
}

export function geometryToPath(geometry, project) {
  const polygonToPath = (polygon) =>
    polygon
      .map((ring) =>
        ring
          .map((point, index) => {
            const [x, y] = project(point);

            return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
          })
          .join(' ') + ' Z'
      )
      .join(' ');

  if (geometry.type === 'Polygon') {
    return polygonToPath(geometry.coordinates);
  }

  return geometry.coordinates.map((polygon) => polygonToPath(polygon)).join(' ');
}

export function geometryCentroid(geometry, project) {
  const coords = [];

  const collect = (value) => {
    value.forEach((entry) => {
      if (Array.isArray(entry[0])) {
        collect(entry);
      } else {
        coords.push(project(entry));
      }
    });
  };

  collect(geometry.coordinates);

  const sum = coords.reduce(
    (accumulator, point) => [accumulator[0] + point[0], accumulator[1] + point[1]],
    [0, 0]
  );

  return [sum[0] / coords.length, sum[1] / coords.length];
}
