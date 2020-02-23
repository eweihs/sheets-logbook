import React from "react";
import moment from "moment";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from "@material-ui/core";

export default function Entry({ entry }) {
  const [date, content] = entry;
  const classes = {};
  return (
    <Box marginY={2}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {moment(date).format("lll")}
          </Typography>
          <Typography variant="body2" component="p">
            {content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Remove</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
