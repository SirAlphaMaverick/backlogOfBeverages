import React, { Component } from 'react';
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar';
import ReactTable from 'react-table-v6';
import "react-table-v6/react-table.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class SearchDrug extends Component {

    constructor(props) {
        super(props);

        this.onChangeDrugid = this.onChangeDrugid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            popularDrugs: ['369844bf', '64d064bf', '32d064bf', '372ce4bf', 'bbfcf518'],
            popularList:[],
            drugs: [],
            drugid: '',
            searchList: [],
            showresults: false,
            isInvalid: false,
            isProgress: 75
        }
    }

    onChangeDrugid(e) {
        this.setState({
            drugid: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const searchId = this.state.drugid;
        console.log(searchId);
        axios.get(`https://api.universalcodes.msupply.org.nz/v1/items?code=${searchId}`)
            .then(response => {
                console.log(response.data)
                var idSearch = this.state.drugs.concat(response.data);
                this.setState({
                    drugs: idSearch,
                    showresults: true,
                    isInvalid: false
                })
                console.log(this.state.drugs);
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isInvalid: true
                })
            })
    }

    componentWillMount() {
        for (let i = 0; i < this.state.popularDrugs.length; i++) {
            var popularSearch = this.state.popularDrugs[i];
            axios.get(`https://api.universalcodes.msupply.org.nz/v1/items?code=${popularSearch}`)
                .then(response => {
                    console.log(response.data)
                    var tempData = this.state.popularList.concat(response.data);
                    var progressAmount = this.state.isProgress + 25;
                    this.setState({
                        popularList: tempData,
                        isProgress: progressAmount
                    })
                })
                .catch((error) => {
                    console.log(error);

                })
        }

    }

    render() {
        return (
            <div>

                <div className="container" style={{ paddingTop: '2.5%', paddingBottom: '2.5%' }}>
                    <form onSubmit={this.onSubmit}>

                        <input placeholder="Enter Drug ID Here" type="text" className="form-control"
                            value={this.state.drugid}
                            onChange={this.onChangeDrugid} required />

                        <div style={{ paddingTop: '2%' }}>
                            <input type="submit" value="Search" className="btn btn-primary" />
                        </div>

                    </form>
                </div>

                {this.state.isInvalid ? <div className="container">
                    <h4>
                        Please Enter a Valid Drug Code !
                    </h4>
                </div> : ''}

                <div className="container">

                    {this.state.showresults ? <ReactTable
                        data={this.state.drugs}
                        columns={[
                            {
                                columns: [

                                    {
                                        Header: "Code",
                                        accessor: "code"
                                    },

                                    {
                                        Header: "Drug Name",
                                        accessor: "name"
                                    }
                                ]
                            },

                        ]}
                        defaultSorted={[
                            {
                                id: "count",
                                desc: true
                            }
                        ]}
                        pageSize={this.state.drugs.length}
                        className="-striped -highlight"
                    /> : ''}

                </div>
                
                <div className="container" style={{ paddingTop: '2.5%' }}>
                    <h5>Some Popular Drugs are...</h5>
                        </div>
                <div className="container" style={{paddingTop:'1%', paddingBottom:'2.5%'}}>
                    {this.state.isProgress<100 ? <ProgressBar animated now={this.state.isProgress} /> : 
                    <ReactTable data={this.state.popularList}
                    columns={[
                        {
                            columns: [

                                {
                                    Header: "Code",
                                    accessor: "code"
                                },

                                {
                                    Header: "Drug Name",
                                    accessor: "name"
                                }
                            ]
                        },

                    ]}
                    defaultSorted={[
                        {
                            id: "name",
                            desc: false
                        }
                    ]}
                    pageSize={this.state.popularList.length}
                    className="-striped -highlight"
                /> }
                </div>
            </div>
        );
    }
}