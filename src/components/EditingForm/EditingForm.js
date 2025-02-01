import React, {Component} from "react";
import PropTypes from "prop-types";


export default class EditingForm extends Component{
    state = {
        newLabel: ''
    }

    static defaultProps = {
        label: '',
        id: 100,
        onEditLabel: () => {},
    }

    static propTypes = {
        label: PropTypes.string,
        id: PropTypes.number,
        onEditLabel: PropTypes.func
    }

    onLabelChange = (event) =>{
        this.setState({
            newLabel: event.target.value
        })
    }

    onKeySubmit = (event) => {
        const {onEditLabel, id, label} = this.props
        const {newLabel} = this.state
        if(event.key === 'Enter'){
            if(newLabel === ''){
                onEditLabel(id, label);
            } else{
                onEditLabel(id, newLabel)
            }
        }
    }

    render() {
        const {label} = this.props
        return(
            <input type='text' className='edit' placeholder={label} onChange={this.onLabelChange} onKeyUp={this.onKeySubmit}/>
        )

    }


}