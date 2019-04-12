import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../screens/Home';
import { getSettings, setSelectedPump } from '../actions/localSettingsActionNF';


const mapStateToProps = state => ({ localSettingsNF: state.localSettingsNF.toJS() });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSettings,
      setSelectedPump
    }, dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
