import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn} from '@progress/kendo-react-grid';
// import '@progress/kendo-theme-default/dist/all.css';
import  products  from './products.json';



const DummyGrid = () => {
    return (
      <Grid
        style={{ height: '250px', width:"600px"}}
        data={products}
        >
        <GridColumn field="ProductID" title="ID" width="40px" />
        <GridColumn field="ProductName" title="Name" width="250px" />
        <GridColumn field="Category.CategoryName" title="CategoryName" />
        <GridColumn field="UnitPrice" title="Price" />
        <GridColumn field="UnitsInStock" title="In stock" />
      </Grid>
    );
}

export default DummyGrid