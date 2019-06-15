# raGrid
Basic Grid Table.. 

Steps:
i. Initialize grid with : 
var foo = new RaGrid('table_section', 'table_id', 'columns_separated_in_comma')

ii. To add filters in columns:
foo.add_filters();

iii. To add a single row:
foo.add_row(array_of_data);
eg: grid.add_row('1', 'Ramu', 'Nepal')
