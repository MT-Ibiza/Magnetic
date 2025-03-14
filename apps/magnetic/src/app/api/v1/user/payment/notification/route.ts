import { NextResponse } from 'next/server';
const Redsys = require('node-redsys-api').Redsys;

const SECRET_KEY = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'; // Clave secreta de pruebas

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = body;

    // Validar que los datos existen
    if (!Ds_SignatureVersion || !Ds_MerchantParameters || !Ds_Signature) {
      return NextResponse.json(
        { message: 'Faltan parámetros en la notificación' },
        { status: 400 }
      );
    }

    const redsys = new Redsys();

    // Validar la firma
    const decodedParams = redsys.decodeMerchantParameters(
      Ds_MerchantParameters
    );
    const isValidSignature = redsys.validateMerchantSignature(
      SECRET_KEY,
      Ds_MerchantParameters,
      Ds_Signature
    );

    if (!isValidSignature) {
      console.error('Firma inválida en la notificación:', { decodedParams });
      return NextResponse.json({ message: 'Firma inválida' }, { status: 400 });
    }

    // Extraer datos relevantes de la notificación
    const {
      Ds_Order: orderId,
      Ds_Amount: amount,
      Ds_Currency: currency,
      Ds_Response: responseCode,
      Ds_AuthorisationCode: authorizationCode,
    } = decodedParams;

    console.log('Notificación de Redsys recibida:', decodedParams);

    // Verificar el estado de la operación
    const isSuccess =
      parseInt(responseCode, 10) >= 0 && parseInt(responseCode, 10) <= 99;

    // Lógica para manejar el estado del pago
    if (isSuccess) {
      console.log(
        `Pago exitoso. Pedido: ${orderId}, Monto: ${amount}, Moneda: ${currency}`
      );
      // Aquí puedes guardar el pago como exitoso en tu base de datos
    } else {
      console.warn(
        `Pago fallido. Pedido: ${orderId}, Código de respuesta: ${responseCode}`
      );
      // Aquí puedes registrar que el pago falló
    }

    // Responder a Redsys para confirmar la recepción de la notificación
    return NextResponse.json({ message: 'OK' });
  } catch (error: any) {
    console.error('Error notificación de pago:', error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
