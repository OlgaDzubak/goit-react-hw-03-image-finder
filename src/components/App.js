import { Component } from "react";
import {Searchbar} from "./Searchbar/Searchbar";
import {Modal} from './Modal/Modal';
import { ImageGallery } from "./ImageGallery/ImageGallery";


//========================================================================================
export class App extends Component {

  state = {
    filter: "",
    showModal : false,
    image: {src: '', alt: '',},
  };


  onSubmitSearchBar = (value) =>{ 
    if (!value.trim()){
      alert("Empty request! Please point what you want to find!");
    }
    this.setState( {filter : value.trim(),} );  }
  
  toggleModal = () => { this.setState(({showModal}) => ({showModal: !showModal,}));};

  onChooseImage = ({src, alt})=>{ this.setState({ image:{ src: src, alt: alt },  showModal: true, })};
  


  render(){

    const {filter, showModal, image} = this.state;
    const {onSubmitSearchBar, onChooseImage, toggleModal} = this;

    return (
      
      <>
        <Searchbar onSubmit={onSubmitSearchBar}></Searchbar>
        <ImageGallery filter={filter} onGalleryClick={onChooseImage}></ImageGallery>
      
        {showModal && (<Modal onCloseModal={toggleModal} image={image}></Modal>)}
      </>

    );
  };
};
//========================================================================================