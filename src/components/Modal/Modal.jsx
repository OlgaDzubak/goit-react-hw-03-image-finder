import { Component } from "react";
import PropTypes from "prop-types";

import css from './modal.module.css';


//========================================================================================
export class Modal extends Component {
    
static propTypes = {
    image: PropTypes.object,
    onCloseModal: PropTypes.func,
}

    abortCtrl;

    componentDidMount()   { window.addEventListener('keydown', this.onKeyDown);};
    componentWillUnmount(){ window.removeEventListener('keydown',this.onKeyDown);};

    onKeyDown = (event) => { if (event.code === 'Escape') this.props.onCloseModal();};

    onOverlayClick = (event) =>{ if (event.target === event.currentTarget){this.props.onCloseModal();}}


    render() {

        const {image} = this.props;
        
        return (

            <div className={css.Overlay} onClick={this.onOverlayClick}>
                <div className={css.modalContent}>
                    <img className={css.modalImage} src={image.src} alt={image.alt}></img> 
                </div>
            </div>
        );
    }
}
//========================================================================================