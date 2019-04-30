import { fromJS } from 'immutable';

const INIT_STATE = {
  stationNumber: 0,
  URL_Service_CardSystem: '0.0.0.0:0',
  URL_Service_Fleets: '0.0.0.0:0',
  URL_Service_Mobile: '0.0.0.0:0',
  taxPercentage: '0',
  pumpCount: '0',
  selectedPump: 0,
  error: false,
  message: '',
  amountAutorized: 0,
  volumeAutorized: 0,
  productsAutorized: [],
  clasification: '',
  balance: 0,
  isPrePay: false,
  idAutorization: 0,
  idClient: 0,
  idIdentificator: 0,
  idCard: 0,
  extraProcess: '',
  isCardAutorized: false,
  externalCardSystemList: {"ExternalCardSystem":[{"ValidationType": [""], "Description":[""], "Parameters":[""]}]},
  isLoading: false,
};

const localSettingsNF = (state = fromJS(INIT_STATE), action) => {
  switch (action.type) {
    case 'INIT_SETTINGS':
      return state.merge(INIT_STATE);
    case 'GET_SETTINGS':
      return state;
    case 'SET_SETTINGS':
      return state.merge({
        stationNumber: action.payload.stationNumber,
        URL_Service_CardSystem: action.payload.URL_Service_CardSystem,
        URL_Service_Fleets: action.payload.URL_Service_Fleets,
        URL_Service_Mobile: action.payload.URL_Service_Mobile,
        taxPercentage: action.payload.taxPercentage,
        pumpCount: action.payload.pumpCount,
        selectedPump: action.payload.pumpCount,
        error: false,
        message: '',
        externalCardSystemList:  {"ExternalCardSystem":[{"ValidationType": [""], "Description":[""], "Parameters":[""]}]}
      });
    case 'SET_SELECTED_PUMP':
      return state.merge({
        selectedPump: action.payload.selectedPump,
        error: false,
        isCardAutorized: false,
        message: '',
      });
    case 'START_SERVICE_CALL':
      return state.merge({
        isLoading: action.payload.status,
      });
    case 'SUCCESS_VALIDATION_CARD':
      return state.merge({
        amountAutorized: action.payload.pAmountAutorized,
        volumeAutorized: action.payload.pVolumenAutorized,
        productsAutorized: action.payload.pProductsAutorized,
        clasification: action.payload.pClasification,
        balance: action.payload.pBalance,
        isPrePay: action.payload.pIsPrePay,
        idAutorization: action.payload.pIdAutorization,
        idClient: action.payload.pIdClient,
        idIdentificator: action.payload.pIdentificatorId,
        idCard: action.payload.pIdCard,
        extraProcess: action.payload.pExtraProcess,
        isCardAutorized: true,
        error: false,
        message: '',
        isLoading: false
      });
    case 'SUCCESS_EXTERNAL_CARD_SYSTEM_LIST':
      return state.merge({
        externalCardSystemList: action.payload.pExternalCardSystemList,
        error: false,
        message: '',
        isLoading: false
      });
    case 'ERROR':
    return state.merge({
      error: true,
      isCardAutorized: false,
      message: action.payload.message,
      isLoading: false
    });
    default:
      return state;
  }
};

export default localSettingsNF;
