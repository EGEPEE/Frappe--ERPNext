# -*- coding: utf-8 -*-
# Copyright (c) 2019, Ega Prasetianti and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Pinjaman(Document):
	pass

	#trigger validate
	def validate(self):
		self.change_status_buku()

	def change_status_buku(self):
		# pengecekan buku yang ada di pinjaman
		if self.pinjaman_line:
			if self.status == 'On Borrow':
				for i in self.pinjaman_line:
					# Mengambil doc yang ada di Master Buku, i.code_buku sebagai link
					buku = frappe.get_doc('Master Buku', i.code_buku)
					buku.status = 'Borrowed'
					buku.save()