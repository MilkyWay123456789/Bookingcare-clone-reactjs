import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientForDoctor } from "../../../services/userService"

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }

    componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lí bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width: '100%' }}>
                            <tr>
                                <td>Emil</td>
                                <td>Tobias</td>
                                <td>Linus</td>
                            </tr>
                            <tr>
                                <td>16</td>
                                <td>14</td>
                                <td>10</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
