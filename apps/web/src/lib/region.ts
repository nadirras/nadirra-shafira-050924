export interface RegionsType {
  'Jawa Barat': {
    'Kota Bandung': string[];
    'Kota Cimahi': string[];
    'Kab. Bandung Barat': string[];
  };
}

export const regions: RegionsType = {
  'Jawa Barat': {
    'Kota Bandung': ['Bandung Timur', 'Antapani'],
    'Kota Cimahi': ['Cimahi Utara', 'Cimahi Tengah'],
    'Kab. Bandung Barat': ['Padalarang', 'Lembang', 'Batujajar'],
  },
};
