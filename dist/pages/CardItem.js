import { deleteCard, toggleFavorite, } from "../../features/superhero/superheroSlice";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Swal from "sweetalert2";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import css from "./CardItem.module.scss";
const CardItem = (props) => {
    const nav = useNavigate();
    const dispatch = useAppDispatch();
    return (<div className={css.container}>
      <div className={`card ${css.card}`}>
        <h2 className={css.title}>{props.superhero}!!!</h2>

        <img src={props.img} width="400px" height="400px" alt="" className={css.img}/>
        <button className={css.btn} onClick={() => {
            dispatch(toggleFavorite(props.id));
        }}>
          {props.isfavorite && <FaHeart />}
          {!props.isfavorite && <FaRegHeart />}
        </button>

        <button className={css.pencil} onClick={() => {
            nav(`/cards/edit/${props.id}`);
        }}>
          <BsPencil />
        </button>
        <button className={css.btntrash} onClick={() => {
            Swal.fire({
                title: "Are you sure you want to delete the card?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteCard(props.id));
                    Swal.fire("Deleted!", "", "success");
                }
                else if (result.isDenied) {
                    Swal.fire("Keeping the card", "", "info");
                }
            });
        }}>
          <BsTrash />
        </button>
        <button className={css.moredetails} onClick={() => {
            nav(`/card/details/${props.id}`);
        }}>
          Choose me!
        </button>
      </div>
    </div>);
};
export default CardItem;
