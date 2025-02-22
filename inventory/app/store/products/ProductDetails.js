import { useRouter } from "next/router";

const products = [
  { id: 1, name: "Produit 1", price: 50, image: "/images/product1.jpg", description: "Description du produit 1" },
  { id: 2, name: "Produit 2", price: 60, image: "/images/product2.jpg", description: "Description du produit 2" },
  { id: 3, name: "Produit 3", price: 70, image: "/images/product3.jpg", description: "Description du produit 3" },
];

export async function getStaticPaths() {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false }; // Important to avoid 404 errors
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return { notFound: true }; // If no product is found, return a 404
  }

  return { props: { product } };
}

const ProductDetails = ({ product }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-lg">Prix: ${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
            Acheter Maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
