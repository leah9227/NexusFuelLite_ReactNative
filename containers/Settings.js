import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from '../screens/Settings';
import { getSettings, initSettings, setSettings } from '../actions/localSettingsActionNF'

const mapStateToProps = state => ({ localSettingsNF: state.localSettingsNF.toJS() });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initSettings,
      getSettings,
      setSettings
    }, dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
