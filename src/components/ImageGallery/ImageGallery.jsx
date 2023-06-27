import { Component } from "react";
import PropTypes from "prop-types";

import {fetchImagesFromAPI} from '../../api/api';
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import {Loader} from '../Loader/Loader';

import css from './imageGallery.module.css';
import {nanoid} from 'nanoid';


const INITIAL_STATE = {
    page: 1,
    per_page: 12,
    gallery: [],
    isLoading: false,
    isEmpty: false,          
    isButtonShown: false,
    error: null,
}


//========================================================================================
export class ImageGallery extends Component {
    abortCtrl;

    static propTypes = {
        filter: PropTypes.string,
        onGalleryClick: PropTypes.func,
    }

   state={ ...INITIAL_STATE }


    componentDidUpdate(prevProps, prevState){

        const {page, per_page} = this.state;
        const {filter} = this.props;

        if (prevProps.filter !== filter) {
            this.setState({...INITIAL_STATE});
            this.getImageGallery(filter, page, per_page);
        }else if (prevState.page !== page) {
            this.getImageGallery(filter, page, per_page);
        }
    }

    getImageGallery = async (query, page, per_page) => {

        if (this.abortCtrl) {this.abortCtrl.abort();}

        try{
            this.setState({isLoading:true});
            this.abortCtrl = new AbortController();
            const {hits, totalHits} = await fetchImagesFromAPI(query, page, per_page, this.abortCtrl);
            if (!hits.length){ return this.setState({isEmpty: true});}
            this.setState(prevState => (
                {   gallery: [...prevState.gallery, ...hits], 
                    isButtonShown: (page < Math.ceil(totalHits /per_page)),
            }));
        }catch(error){
            if (error.code !== 'ERR_CANCELED'){
                this.setState({error: "Oops! Something went wrong! Try reloading the page!"});
            }
        }finally{this.setState({isLoading: false});}
    }

    onClickButton = () => { this.setState(prevState=>({page: prevState.page + 1,}))};

    onGalleryClick = (event) => {
        const {gallery} = this.state;
        const imageIndex= gallery.findIndex(item => item.id.toString() === event.target.id);
        this.props.onGalleryClick({src: gallery[imageIndex].largeImageURL,  alt: gallery[imageIndex].tags,});
    }
    
    render(){
        const {gallery, isEmpty, isLoading, error, isButtonShown} = this.state;
        const {filter} = this.props
      
        return (
            <main className={css.main}>
                {  !isEmpty
                        ? <ul className={css.gallery}>
                            {   gallery.map((item) => { 
                                    return <ImageGalleryItem onGalleryItemClick={this.onGalleryClick} src={item.webformatURL} alt={item.tags} id={item.id} key={nanoid()}></ImageGalleryItem>;
                                })}
                          </ul> 
                        : <p className={css.p_isEmpty}>Sorry. There are no images for filter "{filter}"</p>
                }
                {  isLoading && <Loader className={css.loader}></Loader> }
                {  error && <p className={css.p_isError}>Error: "{error}"</p> }
                { isButtonShown && <Button title='Load more' onClick={this.onClickButton}></Button>}
            </main>
        );
    };
}
//========================================================================================
