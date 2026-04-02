import { supabase } from '../../../lib/supabase';

export const getStops = async () => {
    const { data, error } = await supabase
        .from('Stops')
        .select('id, coordinate_lat, coordinate_lon, location, code, type');

    if (error) throw error;
    return data;
};