import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardPayment from '../screens/CardPayment';
import { cardValidation, getExternalCardSystemList } from '../actions/localSettingsActionNF';

const mapStateToProps = state => ({ localSettingsNF: state.localSettingsNF.toJS() });

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      cardValidation,
      getExternalCardSystemList
    }, dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
