import { getMainProducts } from "app/services/shopify/products";
import Image from "next/image";
import styles from "./MainProducts.module.sass";
import Link from "next/link";

export const MainProducts = async () => {
  const products = await getMainProducts();

  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map(
          (product: {
            id: string;
            title: string;
            handle: string;
            images: {
              src: string;
            }[];
          }) => {
            const imageSrc = product.images[0].src;
            return (
              <Link
                key={product.id}
                href={`/product/${product.handle}?id=${product.id}`}
                className={styles.MainProducts__link}
              >
                <article>
                  <p>{product.title}</p>
                  <Image
                    src={imageSrc}
                    fill
                    alt={product.title}
                    loading="eager"
                  />
                </article>
              </Link>
            );
          }
        )}
      </div>
    </section>
  );
};
