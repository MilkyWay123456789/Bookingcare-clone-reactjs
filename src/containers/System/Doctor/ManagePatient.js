import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage } from 'react-intl';
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientForDoctor } from "../../../services/userService";
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).add(0, 'days').startOf('day').valueOf(),
            dataPatient: [],
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)
    }

    getDataPatient = async (user, formatedDate) => {
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }

    handleBtnConfirm = () => {

    }

    handleBtnRemedy = () => {

    }

    render() {
        let { dataPatient } = this.state;
        console.log("check data", dataPatient)
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
                            <tbody>
                                <tr>
                                    <td>STT</td>
                                    <td>Thời gian</td>
                                    <td>Họ và tên</td>
                                    <td>Địa chỉ</td>
                                    <td>Giới tính</td>
                                    <td>Action</td>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className='mp-btn-corfirm'
                                                        onClick={() => this.handleBtnConfirm()}
                                                    >Xác nhận</button>
                                                    <button className='mp-btn-remedy'
                                                        onClick={() => this.handleBtnRemedy()}
                                                    >Gửi hoá đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>no data</tr>
                                }
                            </tbody>
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
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
