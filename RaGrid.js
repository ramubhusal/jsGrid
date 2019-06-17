class RaGrid {
	constructor(segment_id, grid_id, grid_columns) {
		this.segment_id = segment_id;
    	this.grid_id = grid_id;
    	this.grid_columns = grid_columns.trim();
    	this.splitted_grid_col = this.grid_columns.split(',');

    	this.last_selected_rows;

    	var cssId = 'raGridCSS';  // you could encode the css path itself to generate id..
		if (!document.getElementById(cssId)) {
			var head  = document.getElementsByTagName('head')[0];
			var link  = document.createElement('link');
			link.id   = cssId;
			link.rel  = 'stylesheet';
			link.type = 'text/css';
			link.href = 'raGrid.css';
			link.media = 'all';
			head.appendChild(link);
		}
		if (document.getElementById(this.grid_id) == null) {
			this.create_table();
		} else {
			this.add_event_on_row();
		}
    }

    create_table() {
    	var segment_main = document.getElementById(this.segment_id);
		// var body = document.getElementsByTagName('body')[0];
		var segment = document.createElement('div');
		segment.setAttribute('id', 'raGrid_segment');
		var tbl = document.createElement('table');
		tbl.setAttribute('id', this.grid_id);
		tbl.setAttribute('class', 'raGrid');
		tbl.style.width = '100%';
		tbl.setAttribute('border', '1');

		var tbdy = document.createElement('tbody');
		var tr = document.createElement('tr');

		for (var i = 0; i < this.splitted_grid_col.length; i++) {
			var td = document.createElement('th');
			td.appendChild(document.createTextNode(this.splitted_grid_col[i]));
			tr.appendChild(td);
		}

		tbdy.appendChild(tr);
		tbl.appendChild(tbdy);
		segment.appendChild(tbl);
		segment_main.appendChild(segment);
	}

	add_event_on_row() {
		var this_obj = this;
		var grid_obj = document.getElementById(this.grid_id);
		/* for(var i = 1; i < grid_obj.tBodies[0].rows.length; i++) {
			grid_obj.rows[i].onclick = function(event) {
				this_obj.row_click(grid_obj.tBodies[0].rows[i], false);
			}
		} */
		[...grid_obj.tBodies[0].rows].forEach(function(e) {
			e.onclick = function(event) {
				this_obj.row_click(e, false);
			}
		})
	}

	add_row(arr_val) {
		var  x = this;
		var table = document.getElementById(this.grid_id);
		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(2);
		row.onclick = function(event) {
			x.row_click(row, false);
		}
		var cell = [];
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		for (var i = 0; i < this.splitted_grid_col.length; i++) {
			cell[i] = row.insertCell(i);
			cell[i].innerHTML = arr_val[i];
			cell[i].innerText = arr_val[i];
		}
	}

	add_filters() {
		var this_class = this;
		var table = document.getElementById(this.grid_id);
		var row = table.insertRow(1);
		row.setAttribute('class', 'ignore_hover');
		var cell = [];
		for (var i = 0; i < this.splitted_grid_col.length; i++) {
			cell[i] = row.insertCell(i);
			cell[i].style.padding = '5px 10px 5px 10px';

			var input = document.createElement("input");
			input.type = "text";
			input.className = "raGrid_filters";
			var x = cell[i];
			input.onkeyup = function() {
				this_class.search_val_in_col(this);
			}
			cell[i].appendChild(input);
		}
	}

	search_val_in_col(obj) {
        var input, filter, table, tr, td, i, txtValue;
        filter = obj.value.toUpperCase();
        table = document.getElementById(this.grid_id);
        tr = table.getElementsByTagName("tr");
        for (i = 2; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[obj.parentElement.cellIndex];
            if (td) {
                txtValue = td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }       
        }
    }

    set_col_width(col_widths) {
    	var col_wth = col_widths.trim().split(',');
    	var table = document.getElementById(this.grid_id);
        var tr = table.getElementsByTagName("tr");
        var td = tr[i].getElementsByTagName("td");
    }

	toggle_row_selection(row) {
        row.className = row.className == 'selected' ? '' : 'selected';
        this.last_selected_rows = row;
    }

    row_click(row_obj, lock) {
        if (window.event.ctrlKey) {
            this.toggle_row_selection(row_obj);
        }

        if (window.event.button === 0) {
            if (!window.event.ctrlKey && !window.event.shiftKey) {
                this.clear_all_selection();
                this.toggle_row_selection(row_obj);
            }
        }
    }

    clear_all_selection() {
    	var trs = document.getElementById(this.grid_id).tBodies[0].getElementsByTagName('tr');
        /* for (var i = 0; i < trs.length; i++) {
            trs[i].className = '';
        } */
		trs.forEach(function(e){
            e.className = '';
        });
    }
}
