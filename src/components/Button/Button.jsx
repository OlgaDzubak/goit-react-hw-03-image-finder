import { Component } from "react";
import PropTypes from "prop-types";
import css from './button.module.css';


//========================================================================================
export class Button extends Component {

    static propTypes = {
        title: PropTypes.string,
        onClick: PropTypes.func,
    };

    render(){
        const {title, onClick} = this.props;
        return (
            <button className={css.loadMore_btn} 
                    type='button' 
                    onClick={onClick}>
                    {title}
            </button>
        )
    }
};
   
//========================================================================================