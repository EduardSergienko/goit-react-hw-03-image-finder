import styles from './ImageGalleryItem.module.scss';

export function ImageGalleryItem({ imagesData }) {
  return imagesData.map(item => {
    return (
      <li key={item.id} className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItem_image}
          src={item.webformatURL}
          alt=""
        />
      </li>
    );
  });
}
