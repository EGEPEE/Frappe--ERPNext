# -*- coding: utf-8 -*-
# Copyright (c) 2019, Ega Prasetianti and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Pengembalian(Document):
	pass

	def validate(self):
		self.change_status_pengembalian()
	
	def change_status_pengembalian(self):
		if self.pengembalian_line:
			# Merubah status buku
			for i in self.pengembalian_line:
				buku = frappe.get_doc('Master Buku', i.code_buku)
				buku.status = 'Available'
				buku.save()

			# Merubah status pinjaman
			doc = frappe.get_doc('Pinjaman', self.id_pinjaman)
			doc.status = 'Close'
			doc.save()
			doc.submit()
			