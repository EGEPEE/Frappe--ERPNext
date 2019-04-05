// Copyright (c) 2019, Ega Prasetianti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Request Pinjaman', {
	refresh: function(frm) {
		// Buat button baru, __("") untuk ngebuat dropdown list
		// frm.add_custom_button(__('Button'), function(){
		// 	frappe.msgprint('Hei')
		// },__("")).addClass("btn-primary");
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

cur_frm.set_query('code_buku', 'request_line', function(frm, cdt, cdn){
	return{
		filters: [
			['Master Buku', 'status', '=', 'available']
		]
	}
});
