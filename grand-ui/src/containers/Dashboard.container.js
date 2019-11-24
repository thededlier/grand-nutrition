import {connect} from "react-redux";
import Dashboard from "../components/Dashboard/Dashboard.component";

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