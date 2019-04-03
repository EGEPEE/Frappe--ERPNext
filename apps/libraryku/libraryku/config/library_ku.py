from __future__ import unicode_literals
from frappe import _

def get_data():
    return [
        {
            "label": _("Master"),
            "items": [
                {
                    "type": "doctype",
                    "name":"Master Buku" 
                },
                {
                    "type": "doctype",
                    "name":"Master Member" 
                },
                {
                    "type": "doctype",
                    "name":"Master Tipe Buku" 
                }
            ]
        },
        {
            "label": _("Transaction"),
            "items": [
                {
                    "type": "doctype",
                    "name":"Pinjaman" 
                },
                {
                    "type": "doctype",
                    "name":"Pengembalian" 
                }
            ]
        }
    ]