import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
export default function ImageCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="100"
        image={props.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant='contained'><Link to={`${props.link}?id=${props.id}`}>Book now</Link></Button>
      </CardActions>
    </Card>
  );
}
