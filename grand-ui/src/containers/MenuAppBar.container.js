import {connect} from "react-redux";
import MenuAppBar from "../components/MenuAppBar/MenuAppBar.component";
import {setIsOpen} from "../actions/Config.action";

function mapStateToProps(state) {
    return {
        isOpen: state.config.isOpen,
        isAuthenticated: state.config.isAuthenticated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setIsOpen: (value) => dispatch(setIsOpen(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuAppBar);