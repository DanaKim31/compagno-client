import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapList = ({ content }) => {
  const [list, setList] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    let maplist = [];
    content.forEach((item) => {
      maplist.push({
        title: item.name,
        latlng: { lat: item.latitude, lng: item.longtitude },
      });
    });
    setList(maplist);
    setLat(maplist[0]?.latlng.lat);
    setLng(maplist[0]?.latlng.lng);

    // const latt = maplist[0].latlng.La;
    // console.log(latt);

    // console.log(maplist[0]);
    // const latt = JSON.stringify(maplist[0].LatLng);
    // console.log(latt);
  }, [content]);

  return (
    <>
      <Map
        center={{
          // 지도의 중심좌표
          lat: lat,
          lng: lng,
        }}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
      >
        {list.map((position, index) => (
          <MapMarker
            key={`${position.title}-${position.latlng}`}
            position={position.latlng}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              },
            }}
            title={position.title}
          />
        ))}
      </Map>
    </>
  );
};

export default MapList;
