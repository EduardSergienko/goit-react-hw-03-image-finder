import styles from './Button.module.scss';

export function Button({ onLoadMoreClick }) {
  return (
    <button onClick={onLoadMoreClick} className={styles.Button} type="submit">
      Load More
    </button>
  );
}
