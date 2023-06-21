import { Component } from "react";
import PropTypes from "prop-types";

import css from './imageGalleryItem.module.css'


//========================================================================================
export class ImageGalleryItem extends Component {
    
    static propTypes = {
        onGalleryItemClick: PropTypes.func,
        src: PropTypes.string,
        alt: PropTypes.string,
        id: PropTypes.number,
    }

    render(){
        const {src, alt, id} = this.props;
        return (
            <li className={css.galleryItem} onClick={this.props.onGalleryItemClick}>
                
                <img className={css.galleryItem_image} 
                     src={src}
                     alt={alt}
                     id={id}
                ></img>
            
            </li>
        );
    };
}
//========================================================================================