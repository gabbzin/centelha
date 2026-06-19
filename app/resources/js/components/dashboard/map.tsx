import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
export function Map() {
  return (
    <MapContainer
      center={[-15.793, -47.882]}
      style={{
        height: '500px',
        width: '100%',
      }}
      zoom={13}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[-15.793, -47.882]}>
        <Popup>Brasília</Popup>
      </Marker>
    </MapContainer>
  )
}
