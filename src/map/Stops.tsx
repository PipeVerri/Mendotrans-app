import React from 'react';
import { GeoJSONSource, Layer } from '@maplibre/maplibre-react-native';
import { useStops } from '../db/hooks/useStops';

export const StopsLayer = () => {
    const { data, isLoading } = useStops();

    // 1. Log to check if data is actually reaching this component
    console.log("StopsLayer Data:", data?.features?.length);

    if (isLoading || !data?.features || data.features.length === 0) {
        return null;
    }

    return (
        <GeoJSONSource id="mendo-source" data={data} cluster={true} clusterRadius={50}>
            {/* CLUSTERS */}
            <Layer
                id="mendo-clusters"
                type="circle"
                filter={['has', 'point_count']}
                paint={{
                    'circle-radius': 8,
                    'circle-color': '#1b8d00',
                    'circle-opacity': 0.8,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff',
                }}
            />

            {/* INDIVIDUAL POINTS */}
            <Layer
                id="mendo-points"
                type="circle"
                filter={['!', ['has', 'point_count']]}
                paint={{
                    'circle-radius': 6, // Made larger to be seen
                    'circle-color': '#22c000', // RED so we can distinguish from default icons
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff',
                }}
            />
        </GeoJSONSource>
    );
};