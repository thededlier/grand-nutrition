import Dashboard from "../components/Dashboard/Dashboard.component";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        isOpen: state.config.isOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);