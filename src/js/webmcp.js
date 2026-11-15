/* WebMCP: muat di semua halaman, mis. <script src="/assets/js/webmcp.js" defer></script>
   Menjaga data tetap sinkron dengan Price List: perbarui PRICES bila harga berubah. */
(function () {
  if (!('modelContext' in navigator) || !navigator.modelContext.registerTool) return;

  var PRICES = [
    { type: 'Hanjawong Aruna', concept: 'Sunrise Living', pricePerM2: 1299000 },
    { type: 'Hanjawong Terra', concept: 'Green Productive', pricePerM2: 1099000 },
    { type: 'Hanjawong Reserve', concept: 'Premium View', pricePerM2: 899000 }
  ];
  var NOTE = 'Harga acuan, dapat berubah. Konfirmasi harga, luas, posisi, dan ketersediaan ke tim pemasaran.';

  function text(obj) {
    return { content: [{ type: 'text', text: typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2) }] };
  }

  navigator.modelContext.registerTool({
    name: 'get_project_info',
    description: 'Ringkasan Harmoni Hanjawong Village: lokasi, legalitas, luas kawasan, fasilitas, dan kontak.',
    inputSchema: { type: 'object', properties: {} },
    execute: async function () {
      return text({
        name: 'Harmoni Hanjawong Village',
        developer: 'PT Harmoni Grup Indonesia',
        location: 'Desa Sukamakmur, Kec. Sukamakmur, Kabupaten Bogor, Jawa Barat 16831 (Puncak 2)',
        legal: 'SHM (Sertifikat Hak Milik), Zona Kuning / PP2',
        area: 'Rencana kawasan sekitar 5 hektare, kavling mulai sekitar 100 m2',
        elevation: 'Sekitar 350 mdpl',
        plannedFacilities: ['Resto kawasan', 'Flying fox', 'Playground anak', 'Mushola & toilet', 'Jalan aspal', 'Drainase U-Ditch', 'Solar cell'],
        url: 'https://harmonihanjawongvillage.co.id/'
      });
    }
  });

  navigator.modelContext.registerTool({
    name: 'get_plot_prices',
    description: 'Harga mulai per m2 untuk tipe kavling Aruna, Terra, dan Reserve. Opsional: hitung estimasi untuk luas tertentu.',
    inputSchema: {
      type: 'object',
      properties: {
        areaM2: { type: 'number', description: 'Luas yang ingin dihitung (m2), opsional' }
      }
    },
    execute: async function (args) {
      var area = args && args.areaM2;
      var rows = PRICES.map(function (p) {
        var r = { type: p.type, concept: p.concept, startingPricePerM2IDR: p.pricePerM2 };
        if (area > 0) r.estimatedTotalIDR = p.pricePerM2 * area;
        return r;
      });
      return text({ prices: rows, note: NOTE });
    }
  });

  navigator.modelContext.registerTool({
    name: 'open_survey_form',
    description: 'Buka formulir untuk menjadwalkan survei lokasi atau berkonsultasi dengan tim pemasaran.',
    inputSchema: { type: 'object', properties: {} },
    execute: async function () {
      window.location.href = '/form-survei/';
      return text('Membuka formulir survei: https://harmonihanjawongvillage.co.id/form-survei/');
    }
  });
})();
