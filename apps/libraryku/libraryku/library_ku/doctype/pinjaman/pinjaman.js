// Copyright (c) 2019, Ega Prasetianti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pinjaman', {
	refresh: function(frm) {

	},
	tanggal_pinjam: function(frm) {
		if (frm.doc.tanggal_pinjam < get_today()) {
			frm.set_value('tanggal_pinjam', '')
			frm.set_value('estimasi_tanggal_kembali', '')
			frappe.throw(__('Tidak dapat memilih tanggal terdahulu.'))
		}

		if (frm.doc.tanggal_pinjam) {
			frappe.call({
				method: 'frappe.client.get',
				args: {
					doctype: 'Master Member',
					name: frm.doc.id_member
				},
				callback: function(r){
					if (r.message) {
						var tipe, estimasi, tgl_estimasi
						
						tipe = r.message.tipe_member

						if (tipe == 'Bronze') {
							estimasi = 3
						} else if (tipe == 'Silver') {
							estimasi = 5
						} else {
							estimasi = 10
						}

						tgl_estimasi = frappe.datetime.add_days(frm.doc.tanggal_pinjam, estimasi)
						frm.set_value('estimasi_tanggal_kembali', tgl_estimasi)
					}
				}
			})
		}
	}
});
/* cur_frm.set_query('field_name', 'field_name_child', func(frm, cdt, cdn){
	cdt = child doctype
	cdn = child name

	return{
		filters: [
			['filter condition', 'field name', 'condition', 'value']
		]
		filter condition = doctype referensinya
		field name = field yang mau difilter
		condition = >, <, =
		value = nilainya
	}
})

*/

// Limit dropdown list
cur_frm.set_query('code_buku', 'pinjaman_line', function(frm, cdt, cdn){
	return{
		filters: [
			['Master Buku', 'status', '=', 'available']
		]
	}
});