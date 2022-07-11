import { Component } from 'react';
import styles from './ImageGallery.module.scss';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { fechImg } from 'services/ImageApiService';
import { Rings } from 'react-loader-spinner';
import Notiflix from 'notiflix';
export class ImageGallery extends Component {
  state = {
    page: 1,
    hits: [],
    totalHits: null,
    loading: false,
    status: 'idle',
  };
  componentDidUpdate = async (prevProps, prevState) => {
    const { page } = this.state;
    if (
      prevProps.searchQwery !== this.props.searchQwery ||
      prevState.page !== page
    )
      try {
        this.setState({
          loading: true,
        });
        const resolve = await fechImg(this.props.searchQwery, page);
        console.log(resolve);
        this.setState(prevState => ({
          hits: [...prevState.hits, ...resolve.data.hits],
          totalHits: resolve.data.totalHits,
          loading: false,
        }));

        if (prevProps.searchQwery !== this.props.searchQwery) {
          this.setState({
            hits: [...resolve.data.hits],
            totalHits: resolve.data.totalHits,
          });
          if (!resolve.data.hits.length) {
            Notiflix.Notify.failure(
              `Sory, ${this.props.searchQwery} not found, please try again`
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
  };
  handleLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        {this.state.hits.length > 0 && (
          <ul className={styles.ImageGallery}>
            <ImageGalleryItem imagesData={this.state.hits} />
          </ul>
        )}

        {/* {this.props.searchQwery === '' && <h2>Dava</h2>} */}
        {this.state.loading === true && (
          <div className="loader">
            <Rings
              height="100"
              width="100"
              color="#303f9f"
              ariaLabel="loading"
            />
          </div>
        )}

        <Button onLoadMoreClick={this.handleLoadMoreBtn} />
      </>
    );
  }
}
