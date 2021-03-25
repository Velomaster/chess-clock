import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from 'react-bootstrap/Button';



const TimeOver = (props) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia 
                    component="img"
                    alt="Player Lost"
                    height="140"
                    image="https://img.wallpapersafari.com/desktop/1280/1024/39/12/1WKqbR.jpg"
                    title="Player Lost"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Player Lost
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Player ran out of time. Rematch?
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
        <Button variant="outline-light">
          Start New Game
        </Button>
        <Button variant="link">
          Settings
        </Button>
      </CardActions>
        </Card>

    )
}

export default TimeOver;