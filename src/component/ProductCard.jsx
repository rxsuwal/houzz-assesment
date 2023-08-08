import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ProductCard(props) {
  return (
    <a href='#' class="card flex-md-row border border-0 align-items-center shadow h-100" >

      {props.data.ingredients ?
        <OverlayTrigger overlay={<Tooltip>{`Ingredients: ${Object?.keys(props.data?.ingredients)}`}</Tooltip>}>
          <img src={props.data?.image_url}
            class=" col-md-2 h-100px object-contain" alt="product" />
        </OverlayTrigger> :
        <img src={props.data?.image_url}
          class=" col-md-2 h-100px object-contain" alt="product" />}

      <div class="card-body col-md-10">
        <h3 class="card-title fw-bolder text-capitalize fs-2">{props.data?.name}</h3>
        <h6 className='fw-bold text-capitalize' style={{color:"#bf9b30"}}>{props.data?.tagline}</h6>
        <p class="card-text line-clamp-4 line-clamp-md-2 ">
          {props.data?.description}
        </p>
      </div>
    </a >
  )
}