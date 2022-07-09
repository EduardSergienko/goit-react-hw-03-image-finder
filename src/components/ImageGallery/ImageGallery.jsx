import { Component } from 'react';
import styles from './ImageGallery.module.scss';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { fechImg } from 'services/ImageApiService';
export class ImageGallery extends Component {
  state = {
    page: 1,
    hits: [],
    totalHits: null,
  };
  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.searchQwery !== this.props.searchQwery ||
      prevState.page !== this.state.page
    )
      try {
        const resolve = await fechImg(this.props.searchQwery, this.state.page);
        this.setState(({ hits }) => ({
          hits: [...hits, ...resolve.data.hits],
          totalHits: resolve.data.totalHits,
        }));
        if (prevProps.searchQwery !== this.props.searchQwery) {
          this.setState({
            hits: [...resolve.data.hits],
            totalHits: resolve.data.totalHits,
          });
        }
      } catch (error) {}
  };
  handleLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    return (
      <>
        <ul className={styles.ImageGallery}>
          {this.state.hits && <ImageGalleryItem imagesData={this.state.hits} />}
        </ul>
        <Button onLoadMoreClick={this.handleLoadMoreBtn} />
      </>
    );
  }
}
