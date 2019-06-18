class RaGrid {
	constructor(segment_id, grid_id, grid_columns = '', enable_multiselect = 'n') {
		this.segment_id = segment_id;
    	this.grid_id = grid_id;
    	this.grid_columns = grid_columns.trim();
    	this.splitted_grid_col = this.grid_columns.split(',');
    	this.enable_multiselect = enable_multiselect;

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
			document.getElementById(this.grid_id).setAttribute('border', '1');
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
		});
	}

	add_row(arr_val) {
		var  x = this;
		var table = document.getElementById(this.grid_id);
		// Create an empty <tr> element and add it to the 1st position of the table:
		if (typeof table.rows[1] == 'undefined') {
			var row = table.insertRow(1);
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
		} else {
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
	}

	add_filters(col_count) {
		var this_class = this;
		var table = document.getElementById(this.grid_id);
		var row = table.insertRow(1);
		row.setAttribute('class', 'ignore_hover');
		var cell = [];
		for (var i = 0; i < col_count; i++) {
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

    set_id_index(col_idx, is_hidden) {
    	var tbl_obj = document.getElementById(this.grid_id);
    	[...tbl_obj.rows].forEach(function(e) {
    		if (is_hidden == 'y') {
    			e.cells[col_idx].style.display = 'none';
    		} else {
    			// e.cells[col_idx].style.display = 'block';
    			e.cells[col_idx].style.width = '100px';

    		}
    	});
    }

    get_selected_row_id() {
    	var tbl_obj = document.getElementById(this.grid_id);
    	var return_val = [];
    	if (tbl_obj.getElementsByClassName('selected').length == 0) {
    		return_val = ['error', 'Please Select some Rows from Grid.'];
    	} else if (tbl_obj.getElementsByClassName('selected').length > 1) {
    		if (this.enable_multiselect == 'n') {
    			return_val = ['error', 'Multi-selection is not enabled. Please select a single row.'];
    		} else {
    			var return_arr = [...tbl_obj.getElementsByClassName('selected')].map(function(e) {
    				return e.cells[0].innerHTML;
    			});
    			return_val = ['success', return_arr];
    		}
    	} else {
    		return_val = ['success', tbl_obj.getElementsByClassName('selected')[0].cells[0].innerHTML];
    	}
    	return return_val;
    }

	toggle_row_selection(row) {
		if (row.rowIndex >= 2) {
	        row.className = row.className == 'selected' ? '' : 'selected';
	        this.last_selected_rows = row;
	    }
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
		[...trs].forEach(function(e){
            e.className = '';
        });
    }

    enable_sorting() {
    	var this_obj = this;
    	var tbl_obj = document.getElementById(this.grid_id);
    	var tbl_cells = tbl_obj.rows[0].cells;
    	[...tbl_cells].forEach(function(e) {
    		e.setAttribute('class', 'sort_enabled');
    		e.onclick = function(event) {
    			this_obj.sort_column(e.cellIndex);
    		}
    	});
    }

    sort_column(col_index) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById(this.grid_id);

		switching = true;
		// Set the sorting direction to ascending:
  		dir = "asc";
		/*Make a loop that will continue until
		no switching has been done:*/
		while (switching) {
			//start by saying: no switching is done:
			switching = false;
			rows = table.rows;
			/*Loop through all table rows (except the
			first, which contains table headers):*/
			for (i = 2; i < (rows.length - 1); i++) {
				//start by saying there should be no switching:
				shouldSwitch = false;
				/*Get the two elements you want to compare,
				one from current row and one from the next:*/
				x = rows[i].getElementsByTagName("TD")[col_index];
				y = rows[i + 1].getElementsByTagName("TD")[col_index];

				/* Check if the two rows should switch place,
				based on the direction, asc or desc: */
				if (dir == "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				/* If a switch has been marked, make the switch
				and mark that a switch has been done: */
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				// Each time a switch is done, increase this count by 1:
				switchcount ++; 
			} else {
				/* If no switching has been done AND the direction is "asc",
				set the direction to "desc" and run the while loop again. */
				if (switchcount == 0 && dir == "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}
}
