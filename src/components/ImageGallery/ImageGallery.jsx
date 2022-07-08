import { Component } from 'react';
import styles from './ImageGallery.module.scss';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
export class ImageGallery extends Component {
  state = {
    data: null,
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.searchQwery !== this.props.searchQwery) {
      axios
        .get(
          `https://pixabay.com/api/?key=27491202-6941cbc6cc49fba95622056d0&q=${this.props.searchQwery}&image_type=photo`
        )
        .then(response => {
          this.setState({
            data: response.data,
          });
        });
    }
  };

  render() {
    // const { hits } = this.state.data;
    return (
      <ul className={styles.ImageGallery}>
        {this.state.data && (
          <ImageGalleryItem imagesData={this.state.data.hits} />
        )}
      </ul>
    );
  }
}
