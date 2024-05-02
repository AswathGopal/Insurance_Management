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
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {props.plan}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" disabled={props.claim === 1}>
          {props.claim === 0 ? (
            <Link to={`/claim-form?id=${props.id}&plan=${props.plan}`}>
              Claim
            </Link>
          ) : (
            "Claimed"
          )}
        </Button>
      </CardActions>
    </Card>
  );
}
