import { useNavigate } from "react-router-dom";
import { CgChevronRight } from "react-icons/cg";
import "./CategoryCard.css";

type CategoryCardProps = {
  path: string;
  title: string;
  image: string;
};

export default function CategoryCard({
  path,
  title,
  image,
}: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search?category=${encodeURIComponent(path)}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <span className="category-name">{title}</span>

      <img src={image} alt={title} className="category-image" />

      <CgChevronRight className="category-arrow" />
    </div>
  );
}
