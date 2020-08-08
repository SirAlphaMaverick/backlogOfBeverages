import React, { Component } from 'react';
import axios from 'axios';

export default class AddBeveragelog extends Component {

    constructor(props) {

        super(props);

        this.onChangeBeverage = this.onChangeBeverage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            beverage: "",
            type: ""
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }


    onChangeBeverage(e) {
        this.setState({
            beverage: e.target.value
        });
    }


    onSubmit(e) {

        e.preventDefault();

        let typeofbeverage;
        if (this.state.beverage === 'long black' || this.state.beverage === 'flat white' || this.state.beverage === 'espresso' || this.state.beverage === 'mocha') {
            typeofbeverage = "Coffee"
        }
        else if (this.state.beverage === 'peppermint' || this.state.beverage === 'lemon & ginger' || this.state.beverage === 'green tea' || this.state.beverage === 'black tea') {
            typeofbeverage = "Tea"
        } else {
            typeofbeverage = "Other"
        }

        const beveragelog = {
            name: this.state.name,
            beverage: this.state.beverage,
            type: typeofbeverage
        }

        axios.post('http://localhost:5000/backlog/add', beveragelog)
            .then(res => console.log(res.data));

        console.log(beveragelog);
    }


    render() {
        return (
            <div>
                <h3>Create New Beverage Log</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Beverage: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.beverage}
                            onChange={this.onChangeBeverage}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Beverage Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}