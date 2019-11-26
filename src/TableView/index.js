import React, { Component } from 'react'
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import { Button, GridContainer, Heading } from './styled';
import NumericEditor from "./NumericEditor.jsx";

/**
* @class TableView
* @author Tanmayee Kalluri<kalluri.t@husky.neu.edu>
* This class renders the editable table view and handles its operations
*/
export class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGrid: true,
            columnDefs: [
                { headerName: "Name", field: "name", editable: true },
                { headerName: "Country", field: "country", editable: true },
                { headerName: "Age", field: "age", cellEditor: "numericEditor", editable: true }],
            rowData: [
                { name: "Tanmayee", country: "India", age: 20 },
                { name: "Cindy", country: "Cuba", age: 32 },
                { name: "Juanita", country: "Colombia", age: 72 }],
            editType: "fullRow",
            frameworkComponents: { numericEditor: NumericEditor }
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };

    /**
    * Formulates the data for the newly generated row
    * @returns {rowData}
    */
    createNewRowData = () => {
        var newData = {
            name: "Lorenzo ",
            country: "Italy ",
            age: 35
        };
        return newData;
    }

    /**
    * Displays/Deletes the added row
    * @param {String} res new row
    * @returns {rowNode}
    */
    printResult = (res) => {
        if (res.add) {
            res.add.forEach(function (rowNode) {
            });
        }
        if (res.remove) {
            res.remove.forEach(function (rowNode) {
            });
        }
        if (res.update) {
            res.update.forEach(function (rowNode) {
            });
        }
    }

    /**
    * Adds a new row to the table
    * @returns {rowNode}
    */
    onAddRow = () => {
        var newItem = this.createNewRowData();
        var res = this.gridApi.updateRowData({ add: [newItem] });
        this.printResult(res);
    }

    /**
     * Renders the table view
     * @returns {}
    */
    render() {
        return (
            <GridContainer className="ag-theme-balham">
                <Heading>Editable React Table Component</Heading>
                <Button onClick={this.onAddRow}>Add Row</Button>
                <Button onClick={() => this.gridApi.stopEditing()}>Stop Editing</Button>
                <Button onClick={() => this.gridApi.setRowData([])}>Clear Data</Button>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    frameworkComponents={this.state.frameworkComponents}
                    modules={AllCommunityModules}
                    onGridReady={this.onGridReady}
                    editType={this.state.editType}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </GridContainer>
        );
    }
}