'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function Map({ partners }: { partners: any[] }) {
  if (!partners || partners.length === 0) return <div>No partners available to display on the map.</div>

  const center = [partners[0].latitude, partners[0].longitude] as [number, number]

  return (
    <MapContainer center={center} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {partners.map(partner => (
        <Marker key={partner.id} position={[partner.latitude, partner.longitude]}>
          <Popup>
            <div className="font-semibold">{partner.name}</div>
            <div className="text-sm text-gray-600">{partner.type}</div>
            <div className="text-sm mt-1">{partner.address}</div>
            <div className="text-sm text-blue-600 mt-1">{partner.contact}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
