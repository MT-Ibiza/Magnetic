import { NextResponse } from 'next/server';
import crypto from 'crypto';

const REDSYS_URL = 'https://sis-t.redsys.es:25443/sis/realizarPago'; // URL de pruebas
const SECRET_KEY = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'; // Clave secreta de encriptación de pruebas
const MERCHANT_CODE = '263100000'; // Número de comercio de prueba
const TERMINAL = '3'; // Terminal de pruebas para pagos en EUROS (protocolo CES)
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

    const merchantParams = {
      DS_MERCHANT_AMOUNT: `${Math.round(amount)}`, // Convertir a entero en caso de decimales
      DS_MERCHANT_ORDER: `${orderId}`,
      DS_MERCHANT_MERCHANTCODE: MERCHANT_CODE,
      DS_MERCHANT_CURRENCY: CURRENCY,
      DS_MERCHANT_TRANSACTIONTYPE: '0', // Compra normal
      DS_MERCHANT_TERMINAL: TERMINAL,
      DS_MERCHANT_MERCHANTURL: `${process.env.BASE_URL}/api/payment-notification`, // Webhook de notificación
      DS_MERCHANT_URLOK: urlOk,
      DS_MERCHANT_URLKO: urlKo,
    };

    // Convertir los parámetros a Base64
    const merchantParamsBase64 = Buffer.from(
      JSON.stringify(merchantParams)
    ).toString('base64');

    // Generar la clave de firma
    const keyBuffer = Buffer.from(SECRET_KEY, 'base64');
    const key = crypto.createHmac('sha256', keyBuffer).update(orderId).digest();
    const signature = crypto
      .createHmac('sha256', key)
      .update(merchantParamsBase64)
      .digest('base64');

    return NextResponse.json({
      redsysUrl: REDSYS_URL,
      merchantParams: merchantParamsBase64,
      signature,
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
