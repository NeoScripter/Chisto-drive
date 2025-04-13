import LoginBtn from '@/components/atoms/login-btn';
import Logo from '@/components/atoms/logo';
import CitySelector from '@/components/molecules/shared/city-selector';
import { useAuthContext } from '@/lib/hooks/useAuthContext';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Address, fakeAddresses } from '@/lib/types/address';
import SearchField from '@/components/forms/search-field';
import SelectField from '@/components/forms/select-field';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import SearchHeader from '@/components/molecules/search/search-header';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'images/leaflet/marker-icon-2x.png',
    iconUrl: 'images/leaflet/marker-icon.png',
    shadowUrl: 'images/leaflet/marker-shadow.png',
});

export default function Search() {

    return (
        <div className="primary-px primary-py">
            <SearchHeader />

            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-3.5 flex items-center gap-3">
                    <SearchField
                        value=""
                        onChange={() => {}}
                        placeholder="Поиск по названию"
                        className="w-48 text-sm"
                    />
                    <SelectField
                        values={people}
                        value="Tom Cook"
                        onChange={() => {}}
                        className="w-48"
                    />
                </div>

                <div className="rounded-3xl overflow-clip z-0">
                    <AddressMap addresses={fakeAddresses} />
                </div>
            </section>
        </div>
    );
}

const people = [
    'Tom Cook',
    'Wade Cooper',
    'Tanya Fox',
    'Arlene Mccoy',
    'Devon Webb',
];

type MapProps = {
    addresses: Address[];
};

function AddressMap({ addresses }: MapProps) {
    return (
        <MapContainer
            center={[addresses[0].lat, addresses[0].lng]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '500px', width: '100%', zIndex: '0' }}
        >
            <TileLayer
              /*   attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>' */
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {addresses.map((addr, idx) => (
                <Marker key={idx} position={[addr.lat, addr.lng]}>
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                        {addr.name}
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
}
