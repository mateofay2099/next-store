interface CategoryProps {
  params: {
    categories: string[];
  };
  searchParams?: string;
}

export default function Category(props: CategoryProps) {
  const { categories } = props.params;

  return <h1>Dynamic categories: {categories}</h1>;
}
