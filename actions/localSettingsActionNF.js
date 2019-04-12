import {
  USER_REGISTER_URL,
  PERSONAL_ACCESS_TOKEN,
  USER_FORGOT_PASSWORD_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRECT,
  VALIDATE_CARD,
} from '../config/urls';

export function initSettings() {
  return {
    type: 'INIT_SETTINGS',
  };
}

export function getSettings() {
  return {
    type: 'GET_SETTINGS',
  };
}

export function setSettings(stationNumber, URL_Service, taxPercentage, pumpCount) {
  return {
    type: 'SET_SETTINGS',
    payload: { stationNumber, URL_Service, taxPercentage, pumpCount },
  };
}

export function setSelectedPump(selectedPump) {
  return {
    type: 'SET_SELECTED_PUMP',
    payload: { selectedPump },
  };
}

export function cardValidation(pURL, pCardNumber, pPumpNumber, pNIP, pMileage, pPlates, pStationNumber, pValidationString) {
  return (dispatch) => {

  let body =  '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                '<soap:Body>' +
                  '<ValidaTarjeta xmlns="http://tempuri.org/">' +
                    '<solicitud>' +
                      '<CodigoTarjeta>' + pCardNumber + '</CodigoTarjeta>' +
                      '<NumeroPlacas>' + pPlates + '</NumeroPlacas>' +
                      '<NIP>' + pNIP + '</NIP>' +
                      '<NumeroEstacion>' + pStationNumber + '</NumeroEstacion>' +
                      '<Bomba>' + pPumpNumber + '</Bomba>' +
                      '<MontoSolicitado>' + '0' + '</MontoSolicitado>' +
                      '<VolumenSolicitado>' + '0' + '</VolumenSolicitado>' +
                      '<Kilometraje>' + pMileage + '</Kilometraje>' +
                      '<SerieRFID>' + '0' + '</SerieRFID>' +
                      '<DatoRFID>' + '0' + '</DatoRFID>' +
                      '<SerieAnillo>' + '0' + '</SerieAnillo>' +
                      '<Tag>' + '0' + '</Tag>' +
                      '<CadenaVerificadora>' + pValidationString + '</CadenaVerificadora>' +
                    '</solicitud>' +
                  '</ValidaTarjeta>' +
                '</soap:Body>' +
              '</soap:Envelope>';

  return fetch(`http://${pURL}/${VALIDATE_CARD}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'SOAPAction': 'http://tempuri.org/ValidaTarjeta',
      Accept: 'application/json',
    },
    body: body,
  })
    .then((response) => {

      var temp = JSON.stringify(response._bodyInit.replace(/s:/g,''));
      temp = temp.replace(/a:/g,'');
      temp = temp.replace(/( xmlns=\\".*?")/g, '');
      temp = temp.replace(/( xmlna=\\".*?")/g, '');
      temp = temp.replace(/( xmlni=\\".*?")/g, '');
      temp = temp.replace(/(".*?)/g, '');
      temp = temp.replace(/(<?.*[?]>)/g, '');
      temp = temp.replace(/(xmlnsoap=\\.*?\\)/g, '');
      temp = temp.replace(/(xmlnxsi=\\.*?\\)/g, '');
      temp = temp.replace(/(xmlnxsd=\\.*?\\)/g, '');
      temp = temp.replace(/(  .*?)/g, '');
      temp = temp.replace(/(soap:.*?)/g, '');

      var parseString = require('react-native-xml2js').parseString;

      parseString(temp, function (err, result){
        if(err == null){
          console.log('------------------------------------------------')
          console.log(`Data parsed: ${JSON.stringify(result)}`);
          console.log('------------------------------------------------')

          var boolReponse = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].EsAutorizado[0]

          if(boolReponse == 'true'){

            var AmountAutorized = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].MontoAutorizado[0]
            var VolumenAutorized = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].VolumenAutorizado[0]
            var ProductsAutorized = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].ProductosAutorizados[0].string
            var Clasification = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].Clasificacion[0]
            var Balance = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].Saldo[0]
            var IsPrePay = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].EsPrepago[0]
            var IdAutorization = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].IdAutorizacion[0]
            var IdClient = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].IdCliente[0]
            var IdentificatorId = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].IdentificadorId[0]
            var IdCard = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].IdTarjeta[0]
            var ExtraProcess = result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].ProcesoExtra[0]

            dispatch(successValidationCard(AmountAutorized, VolumenAutorized, ProductsAutorized, Clasification, Balance, IsPrePay, IdAutorization, IdClient, IdentificatorId, IdCard, ExtraProcess));
          }
          else{
            dispatch(error(result.Envelope.Body[0].ValidaTarjetaResponse[0].ValidaTarjetaResult[0].Mensaje[0]));
          }
        }
        else{
          console.log('------------------------------------------------')
          console.log(`Data with error: ${JSON.stringify(temp)}`);
          console.log('------------------------------------------------')
          dispatch(error(`Error parsing xml to json: ${err}`));
        }
      });

    })
    .catch((error_msg) => {
      dispatch(error(`Error: ${error_msg}`));
    });
  }
}

export function successValidationCard(pAmountAutorized, pVolumenAutorized, pProductsAutorized, pClasification, pBalance, pIsPrePay, pIdAutorization, pIdClient, pIdentificatorId, pIdCard, pExtraProcess) {
  return {
    type: 'SUCCESS_VALIDATION_CARD',
    payload: { pAmountAutorized, pVolumenAutorized, pProductsAutorized, pClasification, pBalance, pIsPrePay, pIdAutorization, pIdClient, pIdentificatorId, pIdCard, pExtraProcess },
  };
}

export function error(message) {
  return {
    type: 'ERROR',
    payload: { message },
  };
}

//
// export function successValidateVouchers(currentProgress, currentPoints, pendingPoints) {
//   return {
//     type: 'SUCCESS_VALIDATE_VOUCHERS',
//     payload: { currentProgress, currentPoints, pendingPoints },
//   };
// }
//
//
// export function validateVouchers() {
//   return (dispatch, getState) => {
//     const { auth } = getState();
//     return fetch(USER_POINTS, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${auth.get('accessToken')}`,
//       },
//     })
//       .then(response => response.json())
//       .then((json) => {
//         if (json.failed) {
//           dispatch(error(json.errorMessages[0]));
//         } else {
//           dispatch(successValidateVouchers(json.result.currentProgress,
//             json.result.currentPoints, json.result.pendingPoints));
//         }
//       })
//       .catch(() => {
//         dispatch(error('Error inesperado al obtener los puntos.'));
//       });
//   };
// }
