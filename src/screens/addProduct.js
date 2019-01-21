import React, { Component } from "react";
import {
  Container,
  Picker,
  Card,
  CardItem,
  Text,
  Body,
  View,
  Button,
  Right
} from "native-base";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { ALL_PRODUCTS, GET_PRODUCT } from "../redux/actions/product";
import { ALL_SUPPLIERS } from "../redux/actions/supplier";
import ip from "../redux/config";

class addProduct extends Component {
  state = {
    supplier: undefined,
    productId: 1,
    carts: [],
    qty: 0,
    qtyProduct: 0,
    totalProduct: 0
  };

  componentDidMount() {
    this.props.dispatch(ALL_PRODUCTS());
    this.props.dispatch(ALL_SUPPLIERS());
  }

  onChangeSupplier(supplier) {
    this.setState({ supplier });
  }

  onChangeProduct(productId) {
    this.props.dispatch(GET_PRODUCT(productId));
    this.setState({ productId });
  }

  async onSaveTransaction() {
    await axios
      .post(`${ip}/purchaseOrder`, {
        ...this.state.carts,
        supplier_id: this.state.supplier,
        totals: this.state.totalProduct,
        qty: this.state.qty
      })
      .then(response => {
        console.warn(response);
      })
      .catch(response => {
        console.warn(response);
      });
  }

  async onAddProduct() {
    await this.setState(prevState => ({
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

    const totalProduct = this.state.carts.reduce((acc, currValue) => {
      return acc + currValue.total;
    }, 0);

    const qtyProduct = this.state.carts.reduce((acc, currValue) => {
      return parseInt(acc + currValue.qty);
    }, 0);

    this.setState({ totalProduct, qtyProduct });
  }

  async onDeleteProduct(index) {
    await this.setState(prevState => ({
      carts: prevState.carts.filter((product, i) => {
        return i !== index;
      })
    }));

    const totalProduct = this.state.carts.reduce((acc, currValue) => {
      return acc + currValue.total;
    }, 0);

    const qtyProduct = this.state.carts.reduce((acc, currValue) => {
      return parseInt(acc + currValue.qty);
    }, 0);

    this.setState({ totalProduct, qtyProduct });
  }

  render() {
    return (
      <Container>
        <View style={{ margin: 10, flex: 1 }}>
          <View>
            <Text note> Select Supplier </Text>
            <Picker
              mode="dialog"
              selectedValue={this.state.supplier}
              onValueChange={supplier => this.onChangeSupplier(supplier)}
            >
              <Picker.Item label="Select" />
              {this.props.suppliers.isLoading ? (
                <Picker.Item label="Loading" />
              ) : (
                this.props.suppliers.results.map((item, key) => {
                  return (
                    <Picker.Item key={key} label={item.name} value={item.id} />
                  );
                })
              )}
            </Picker>
          </View>
          <ScrollView style={{ flex: 1 }}>
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
          </ScrollView>

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
                    <Picker.Item label={item.name} value={item.id} key={key} />
                  );
                })
              )}
            </Picker>
            <TextInput
              keyboardType="numeric"
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
            <Text style={{ flex: 1 }}>Total</Text>
            <Text>{this.state.totalProduct}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ flex: 1 }}>QTY</Text>
            <Text>{this.state.qtyProduct}</Text>
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
      </Container>
    );
  }
}
const mapStateToPros = state => ({
  products: state.productsReducers,
  product: state.productReducers,
  suppliers: state.suppliersReducers
});

export default connect(mapStateToPros)(addProduct);
