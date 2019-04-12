import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardPayment from '../screens/CardPayment';
import { cardValidation } from '../actions/localSettingsActionNF';

const mapStateToProps = state => ({ localSettingsNF: state.localSettingsNF.toJS() });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      cardValidation
    }, dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
