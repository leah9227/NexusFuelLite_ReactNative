import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaymentSelection from '../screens/PaymentSelection';

const mapStateToProps = state => ({ localSettingsNF: state.localSettingsNF.toJS() });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {

    }, dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSelection);
