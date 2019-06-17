# raGrid
Basic Grid Table.. 

Two Types:
Table already created with HTML.
<table id='something' class='raGrid'>
</table>

Steps for table already created with HTML.
i. Create a section <div> with some class name. Say: 'tbl_sec'.
ii. Set id to something and class as 'raGrid'.
iii. Create <tbody> and define headers and rows.
iv. Initialize grid: 
  init_grid_a = new RaGrid('tbl_sec', 'tbl_id');
v. Set ID of table:
  PArameters: i) index of column [starting from 0]
  ii) char-> Hide the id column or not
  init_grid_a.set_id_index(0, 'n');
  
vi. Add inline filter:
  Parameters: Total Column count to show inline filter on.
  init_grid_a.add_filters(3);
  
vii. If you want to enable sorting then use:
  init_grid_a.enable_sorting();
  
 Another CAse::
 
 If you have no tables created with HTML. Use below:j
 
i. Initialize grid with : 
var foo = new RaGrid('table_section', 'table_id', 'columns_separated_in_comma');

ii. To add filters in columns:
foo.add_filters();

iii. To add a single row:
foo.add_row(array_of_data);
eg: grid.add_row('1', 'Ramu', 'Nepal')
