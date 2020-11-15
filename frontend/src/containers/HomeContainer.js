import Home from "../components/Home/Home.js";
import { connect } from "react-redux";
import { fetchTonnage } from "../actions/DataActions";

const mapStateToProps = (state, ownProps) => {
  return {
    tonnage: state.data.tonnage,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTonnage: () => dispatch(fetchTonnage())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
