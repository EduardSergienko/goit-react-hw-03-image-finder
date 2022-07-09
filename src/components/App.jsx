import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
export class App extends Component {
  state = {
    searchingImg: '',
  };
  formData = data => {
    this.setState({
      searchingImg: data,
    });
  };

  render() {
    const { searchingImg } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formData} />
        <ImageGallery searchQwery={searchingImg} />
      </>
    );
  }
}
