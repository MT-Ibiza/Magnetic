import { useNavigate, useParams } from "react-router-dom";
import { useItem } from "../../hooks/useItem";

interface Props {}

export function ViewItemPage(props: Props) {
    const params = useParams();
    const serviceId = Number(params.serviceId);
    const itemId = Number(params.itemId);
    const navigate = useNavigate();
  
    const { isLoading, isError, item, serviceCategories, error } = useItem(
      serviceId,
      itemId
    );
  return (
    <div>
     {item?.name}
    </div>
  );
}

export default ViewItemPage;
