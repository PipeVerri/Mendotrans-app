import { useEffect, useState } from 'react';
import { getStops } from '../queries/stops';
import type { FeatureCollection, Point } from 'geojson';

export const useStops = () => {
    const [data, setData] = useState<FeatureCollection<Point>>({
        type: 'FeatureCollection',
        features: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndFormat = async () => {
            try {
                const rawData = await getStops();

                const geojson: FeatureCollection<Point> = {
                    type: 'FeatureCollection',
                    features: rawData.map((s) => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            // Upside down because GeoJSON standard: [Longitude, Latitude]
                            coordinates: [Number(s.coordinate_lat), Number(s.coordinate_lon)],
                        },
                        properties: { ...s },
                    })),
                };

                setData(geojson);
            } catch (err) {
                console.error("Failed to fetch stops:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndFormat();
    }, []);

    return { data, isLoading };
};