import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function ProductCard(props) {
    return (
      <a href='#' class="card flex-md-row border border-0 align-items-center shadow h-100">
  
        <OverlayTrigger overlay={<Tooltip>{`Ingredients: ${Object.keys(props.data.ingredients)}`}</Tooltip>}>
          <img src={props.data.image_url}
            style={{ height: "100px", objectFit: "contain" }}
            class=" col-md-4" alt="product" />
        </OverlayTrigger>
        <div class="card-body col-md-8">
          <h5 class="card-title">{props.data.name}</h5>
          <h6 className='text-warning'>{props.data.tagline}</h6>
          <p class="card-text line-clamp-2">
            {props.data.description}
          </p>
        </div>
      </a >
    )
  }