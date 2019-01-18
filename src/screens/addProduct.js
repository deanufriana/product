import React, { Component } from "react";
import {
  Container,
  Picker,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  View,
  Button,
  Left,
  Right
} from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { ALL_PRODUCTS, GET_PRODUCT } from "../redux/actions/product";

class addProduct extends Component {
  state = {
    supplier: undefined,
    productId: 1,
    carts: [],
    products: {},
    price: {},
    qty: 0
  };

  componentDidMount() {
    this.props.dispatch(ALL_PRODUCTS());
  }

  onChangeSupplier(supplier) {
    this.setState({ supplier });
  }

  onChangeProduct(productId) {
    this.props.dispatch(GET_PRODUCT(productId));
    this.setState({ productId });
  }

  onAddProduct() {
    this.setState(prevState => ({
      carts: [
        ...prevState.carts,
        {
          id: this.props.product.data.id,
          name: this.props.product.data.name,
          qty: this.state.qty,
          total: this.props.product.data.price * this.state.qty
        }
      ]
    }));
  }

  onDeleteProduct(index) {
    this.setState(prevState => ({
      carts: prevState.carts.filter((product, i) => {
        return i !== index;
      })
    }));
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ margin: 10 }}>
            <Picker
              mode="dialog"
              selectedValue={this.state.supplier}
              onValueChange={supplier => this.onChangeSupplier(supplier)}
            >
              <Picker.Item label="Sup1" value="1" />
              <Picker.Item label="Sup2" value="2" />
            </Picker>

            {this.state.carts.map((data, key) => {
              return (
                <Card key={key}>
                  <CardItem key={key}>
                    <Body>
                      <Text>{data.name}</Text>
                      <Text note>Total: {data.total} </Text>
                    </Body>
                    <Right>
                      <Button
                        onPress={() => this.onDeleteProduct(key)}
                        full
                        small
                        danger
                        style={{ marginBottom: 5 }}
                      >
                        <Text>Hapus</Text>
                      </Button>
                      <Button full small success>
                        <Text>Edit</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              );
            })}
            <View style={{ flexDirection: "row" }}>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.state.productId}
                onValueChange={productId => this.onChangeProduct(productId)}
              >
                {this.props.products.isLoading ? (
                  <Picker.Item label="Loading" />
                ) : (
                  this.props.products.results.map((item, key) => {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.id}
                        key={key}
                      />
                    );
                  })
                  //   <FlatList
                  //     data={this.props.products.results}
                  //     renderItem={item => {
                  //      ;
                  //     }}
                  //   />
                )}
              </Picker>
              <TextInput
                placeholder="QTY"
                onChangeText={qty => this.setState({ qty })}
              />
              <Button
                small
                style={{ alignSelf: "center", marginLeft: 5 }}
                onPress={() => this.onAddProduct()}
              >
                <Text>Add</Text>
              </Button>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button small style={{ flex: 1 }}>
                <Text>Simpan</Text>
              </Button>
              <Button small full danger>
                <Text>Batal</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToPros = state => ({
  products: state.productsReducers,
  product: state.productReducers
});

export default connect(mapStateToPros)(addProduct);
