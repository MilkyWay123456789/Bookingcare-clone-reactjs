import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import "./ManageDoctor.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import {LANGUAGES} from '../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
           contentMarkdown:'',
           contentHTML:'',
           selectedDoctor:'',
           description:'',
           listDoctors:[],
        }
    }

    componentDidMount() {
       this.props.fetchAllDoctors()
    }

    buildDataInputSelect=(inputData)=>{
        let result=[];
        let {language}=this.props;
        if(inputData&&inputData.length>0){
            inputData.map((item,index)=>{
                let object={};
                let labelVi=`${item.lastName} ${item.firstName}`;
                let labelEn=`${item.firstName} ${item.lastName}`
                object.label=language===LANGUAGES.VI?labelVi:labelEn;
                object.value=item.id;
                result.push(object)
            })
            
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctors!==this.props.allDoctors){
            let dataSelect=this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors:dataSelect
            })
        }
        if(prevProps.language!==this.props.language){
            let dataSelect=this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors:dataSelect
            })
        }
    }

    // Finish!
    handleEditorChange=({ html, text }) =>{
        this.setState({
            contentMarkdown:text,
            contentHTML:html,
        })
    }

    handleSaveContentMarkdown=()=>{
        this.props.saveDetailInforDoctor({
            contentHTML:this.state.contentHTML,
            contentMarkdown:this.state.contentMarkdown,
            description:this.state.description,
            doctorId:this.state.selectedDoctor.value
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
          console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleOnChangeDesc=(event)=>{
        this.setState({
            description:event.target.value
        })
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin doctor
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea 
                            className='form-control' rows="4"
                            onChange={(event)=>this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >
                            ghjhjh
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                     />
                </div>
                <button 
                    onClick={()=>this.handleSaveContentMarkdown()}
                    className='save-content-doctor'
                >
                    Lưu thông tin
                </button>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: ()=>dispatch(actions.fetchAllDoctors()),
        saveDetailInforDoctor:(data)=>dispatch(actions.saveDetailInforDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
