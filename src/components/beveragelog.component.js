import React, { Component } from 'react';
import axios from "axios";
import ReactTable from 'react-table-v6';
import "react-table-v6/react-table.css";


export default class Beveragelog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            beveragelog: [],
            count: []
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:5000/backlog/`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    beveragelog: response.data
                })
                const beverageTypes = this.state.beveragelog
                    .map(beveragelogItem => beveragelogItem.type).filter((type, index, array) => array.indexOf(type) === index);

                const counts = beverageTypes
                    .map(type => ({
                        type: type,
                        count: this.state.beveragelog.filter(item => item.type === type).length
                    }));
                this.setState({
                    count: counts
                })
                console.log(this.state.count);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        return (
            <div>
                <div className="container">
                    <ReactTable
                        data={this.state.count}
                        columns={[
                            {
                                columns: [

                                    {
                                        Header: "Type of Beverage",
                                        accessor: "type"
                                    },

                                    {
                                        Header: "Count",
                                        accessor: "count"
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
                        pageSize={this.state.count.length}
                        className="-striped -highlight"
                    />
                </div>
                <br></br>
                <ReactTable
                    data={this.state.beveragelog}
                    columns={[
                        {
                            columns: [

                                {
                                    Header: "Name",
                                    accessor: "name"
                                },

                                {
                                    Header: "Beverage",
                                    accessor: "beverage"
                                },

                                {
                                    Header: "Type",
                                    accessor: "type"
                                }
                            ]
                        },

                    ]}
                    defaultSorted={[
                        {
                            id: "name",
                            asc: true
                        }
                    ]}
                    pageSize={this.state.beveragelog.length}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}