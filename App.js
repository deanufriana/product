import Home from "./src/screens/Home";
import { createStackNavigator, createAppContainer } from "react-navigation";
import addProduct from "./src/screens/addProduct";

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    addProduct: {
      screen: addProduct,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'addProduct'
  }
);

export default createAppContainer(App);
