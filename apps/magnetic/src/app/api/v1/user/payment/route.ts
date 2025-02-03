import { NextResponse } from 'next/server';
const Redsys = require('node-redsys-api').Redsys;

const REDSYS_URL = 'https://sis-t.redsys.es:25443/sis/realizarPago'; // URL de pruebas
const SECRET_KEY = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'; // Clave secreta de encriptación de pruebas
const MERCHANT_CODE = '263100000'; // Número de comercio de prueba
const TERMINAL = '1'; // Terminal de pruebas para pagos en EUROS (protocolo CES)
const CURRENCY = '978'; // Código ISO para Euros

interface InitPaymentRequest {
  amount: number; // En céntimos (1000 = 10€)
  orderId: string; // ID único del pedido
  urlOk: string; // URL de redirección en caso de éxito
  urlKo: string; // URL de redirección en caso de error
}

export async function POST(request: Request) {
  try {
    const { amount, orderId, urlOk, urlKo }: InitPaymentRequest =
      await request.json();

    // Validaciones de los parámetros
    if (!amount || !orderId || !urlOk || !urlKo) {
      return NextResponse.json(
        { message: 'Faltan parámetros obligatorios' },
        { status: 400 }
      );
    }
    if (!/^[0-9A-Za-z]{1,12}$/.test(orderId)) {
      return NextResponse.json(
        {
          message:
            'El número de pedido (orderId) debe ser alfanumérico y tener máximo 12 caracteres',
        },
        { status: 400 }
      );
    }

    const redsys = new Redsys();

    const merchantParams = {
      DS_MERCHANT_AMOUNT: `${Math.round(amount)}`, // Convertir a entero en caso de decimales
      DS_MERCHANT_ORDER: `MAGNETIC-${orderId}`,
      DS_MERCHANT_MERCHANTCODE: MERCHANT_CODE,
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: '0', // Compra normal
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_MERCHANTURL: `https://localhost:4200/api/payment-notification`, // Webhook de notificación
      DS_MERCHANT_URLOK: urlOk,
      DS_MERCHANT_URLKO: urlKo,
    };
    console.log(merchantParams);
    return NextResponse.json({
      redsysUrl: REDSYS_URL,
      signature: redsys.createMerchantSignature(SECRET_KEY, merchantParams),
      merchantParams: redsys.createMerchantParameters(merchantParams),
    });
  } catch (error: any) {
    console.error('Error al crear el pago:', error);
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
