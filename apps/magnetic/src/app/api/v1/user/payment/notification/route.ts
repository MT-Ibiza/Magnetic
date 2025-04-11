import { bookingConfirmationTemplate } from 'apps/magnetic/src/app/emails/new-order-confirmation';
import db from 'apps/magnetic/src/app/libs/db';
import { sendEmail } from 'apps/magnetic/src/app/libs/emails';
import { NextRequest, NextResponse } from 'next/server';
const Redsys = require('node-redsys-api').Redsys;
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.PAYMENT_SECRET_KEY;

export async function POST(request: Request) {
  console.log('callback payment recibido');

  try {
    const rawBody = await request.text();

    // Convertir el body a un objeto usando URLSearchParams
    const params = new URLSearchParams(rawBody);
    const Ds_SignatureVersion = params.get('Ds_SignatureVersion');
    const Ds_MerchantParameters = params.get('Ds_MerchantParameters');
    const Ds_Signature = params.get('Ds_Signature');

    console.log('Parsed Params:', {
      Ds_SignatureVersion,
      Ds_MerchantParameters,
      Ds_Signature,
    });

    // Validar que los datos existen
    if (!Ds_SignatureVersion || !Ds_MerchantParameters || !Ds_Signature) {
      return NextResponse.json(
        { message: 'Faltan parámetros en la notificación' },
        { status: 400 }
      );
    }

    const redsys = new Redsys();

    // Decodificar los parámetros
    const decodedParams = redsys.decodeMerchantParameters(
      Ds_MerchantParameters
    );

    // Crear la firma esperada a partir de los parámetros y la clave secreta
    const merchantSignatureNotif = redsys.createMerchantSignatureNotif(
      SECRET_KEY,
      Ds_MerchantParameters
    );

    // Comparar la firma recibida con la generada
    const isValidSignature = redsys.merchantSignatureIsValid(
      Ds_Signature,
      merchantSignatureNotif
    );

    if (!isValidSignature) {
      console.error('❌ Firma inválida en la notificación:', { decodedParams });
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

    // Verificar el estado del pago
    const isSuccess =
      parseInt(responseCode, 10) >= 0 && parseInt(responseCode, 10) <= 99;

    if (isSuccess) {
      console.log(
        `✅ Pago exitoso. Pedido: ${orderId}, Monto: ${amount}, Moneda: ${currency}`
      );

      const orderIdString = orderId as string;
      const id = orderIdString.split('-')[1];

      const order = await db.order.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          user: true,
          guestUser: true,
          forms: {
            orderBy: {
              date: 'asc',
            },
          },
          items: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!order) {
        return NextResponse.json(
          { message: 'Orden no encontrada' },
          { status: 404 }
        );
      }

      if (order.status === 'success') {
        return NextResponse.json({ message: 'OK' });
      }

      await db.order.update({
        where: {
          id: Number(id),
        },
        data: {
          status: 'success',
        },
      });

      if (order.guestUser) {
        const cookieStore = cookies();
        cookieStore.delete('cartId');
        console.log('remove guest cart');
      }

      // Enviar email de confirmación
      try {
        if (order.user) {
          await sendEmail({
            to: order.user.email,
            subject: `Order Confirmation #${order.id} - Magnetic Travel`,
            html: bookingConfirmationTemplate(order as any),
          });
          console.log('email sent to: ', order.user.email);
        }
        if (order.guestUser) {
          await sendEmail({
            to: order.guestUser.email,
            subject: `Order Confirmation #${order.id} - Magnetic Travel`,
            html: bookingConfirmationTemplate(order as any),
          });
          console.log('guest email sent to: ', order.guestUser.email);
        }
      } catch (emailError) {
        console.error('Error enviando email:', emailError);
      }
    } else {
      console.warn(
        `❌ Pago fallido. Pedido: ${orderId}, Código de respuesta: ${responseCode}`
      );
    }
    return NextResponse.json({ message: 'OK' });
  } catch (error: any) {
    console.error('Error en la notificación de pago:', error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
