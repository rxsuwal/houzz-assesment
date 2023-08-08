import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ProductCard(props) {
  return (
    <a href='#' class="card flex-md-row border border-0 align-items-center shadow h-100">

      {props.data.ingredients ?
        <OverlayTrigger overlay={<Tooltip>{`Ingredients: ${Object?.keys(props.data?.ingredients)}`}</Tooltip>}>
          <img src={props.data?.image_url}
            class=" col-md-2 h-100px object-contain" alt="product" />
        </OverlayTrigger> :
        <img src={props.data?.image_url}
          class=" col-md-2 h-100px object-contain" alt="product" />}

      <div class="card-body col-md-10">
        <h5 class="card-title text-capitalize">{props.data?.name}</h5>
        <h6 className='text-warning text-capitalize'>{props.data?.tagline}</h6>
        <p class="card-text line-clamp-2">
          {props.data?.description}
        </p>
      </div>
    </a >
  )
}