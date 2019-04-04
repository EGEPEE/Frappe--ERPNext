// Copyright (c) 2019, Ega Prasetianti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pengembalian', {
	refresh: function(frm) {

	},
	// First option of pengembalian_line, with frappe()
	id_pinjaman: function(frm) {
		// variable array untuk doctype untuk target
		frm.doc.pengembalian_line = []
		if (frm.doc.id_pinjaman) {
			frappe.call({
				method: 'frappe.client.get',
				args: {
					// doctype source
					doctype: 'Pinjaman',
					// parameter yang mau dicocokin antara doc.pinjaman dan doc.pengembalian
					name: frm.doc.id_pinjaman
				},
				callback: function(r) {
					if (r.message) {
						// mengambil sourcenya
						for (var row in r.message.pinjaman_line) {
							var child = frm.add_child('pengembalian_line')
							frappe.model.set_value(child.doctype, child.name, "code_buku", r.message.pinjaman_line[row].code_buku)
							frappe.model.set_value(child.doctype, child.name, "nama_buku", r.message.pinjaman_line[row].nama_buku)
							frappe.model.set_value(child.doctype, child.name, "tipe_buku", r.message.pinjaman_line[row].tipe_buku)
						}
					}
					frm.refresh_field('pengembalian_line')
				}
			})
		}
	}

	// second option of pengembalian_line with with_doc()
	// id_pinjaman: function(frm) {
	// 	frappe.model.with_doc('Pinjaman', frm.doc.id_pinjaman, function() {
	// 	var tableRef = frappe.model.get_doc('Pinjaman', frm.doc.id_pinjaman)
	// 	$.each(tableRef.pinjaman_line, function(index, row){
	// 		var child = frm.add_child('pengembalian_line');
	// 		frappe.model.set_value(child.doctype, child.name, "code_buku", row.code_buku);
	// 		frappe.model.set_value(child.doctype, child.name, "nama_buku", row.nama_buku);
	// 		frappe.model.set_value(child.doctype, child.name, "tipe_buku", row.tipe_buku);
	// 		refresh_field('pengembalian_line');
	// 		});
	// 	});
	// },
	// tanggal_kembali: function(frm) {
	// 	var diffDay = frappe.datetime.get_diff(frm.doc.tanggal_kembali, frm.doc.estimasi_tanggal_kembali)
	// 	if (diffDay > 0) {
	// 		var denda = 1500 * diffDay
	// 		frm.set_value('denda', denda)
	// 	} else {
	// 		frm.set_value('denda', 0)
	// 	}
	// }
});

// Limit dropdown list
cur_frm.set_query('id_pinjaman', function(){
	return{
		filters: [
			['Pinjaman', 'status', '=', 'On Borrow']
		]
	}
});