import { useEffect, useRef } from "react";

const Map = ({ latitude, longtitude }) => {
  const mapRef = useRef(null);

  const options = {
    center: new window.kakao.maps.LatLng(latitude, longtitude),
    level: 3,
  };

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapRef.current, options);

    const markerPosition = new window.kakao.maps.LatLng(latitude, longtitude);

    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [latitude, longtitude]);

  return <div id="map" ref={mapRef}></div>;
};

export default Map;
