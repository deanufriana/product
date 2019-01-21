import React, { Component } from "react";
import { Text, Button, View } from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import { GET_USER } from "../redux/actions/product";
import {
  Fab,
  Icon,
  Container,
  Content,
  Card,
  CardItem,
  Body
} from "native-base";

class Home extends Component {
  handleGetState = () =>
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then(response => {
      const { data } = response;
      this.props.dispatch(GET_USER(data));
    });

  render() {
    console.warn(this.props.product)
    return (
      <Container style={{ justifyContent: "center", flex: 1 }}>
        <Content style={{ margin: 20, flex: 1 }}>
          <Text style={{alignItems: 'flex-end'}}>Purchase Order</Text>
          <View style={{ alignContent: "center"}}>
            <Card>
              <CardItem header>
                <Text>Product</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Sapiente aspernatur, fugit facere similique non optio
                    recusandae dolore commodi quaealignSelfrat suscipit totam voluptate
                    delectus ab eaque vero quisquam velit. Praesentium, facere.
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </View>
        </Content>
        <Fab active={true} position="bottomRight">
          <Icon name="add"/>
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  product: state.productReducers
});

export default connect(mapStateToProps)(Home);
