import React from 'react';

interface Props {}

function TermsConditionsPage(props: Props) {
  const {} = props;

  return (
    <div className="px-6 max-w-4xl mx-auto py-10 flex flex-col gap-12">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-bold mb-4 text-center">
          TERMS & CONDITIONS - ONLINE BOOKING PLATFORM
        </h1>
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">TERMS AND CONDITIONS</h2>
          <p>
            <strong>The Company, we, us</strong> means Magnetic Journeys SL, CIF
            B57847675, acting as an independent agent for both Clients and
            Suppliers.
          </p>
          <p>
            <strong>Client, you</strong> means the person, firm or company who
            becomes a customer of the Company through booking any of the
            services offered in the Platform by it and is responsible and liable
            for the payment of the Services.
          </p>
          <p>
            <strong>The Platform</strong> means an online booking platform
            created by the Company so Clients can book concierge services
            independently.
          </p>
          <div>
            <p>
              <strong>Service(s)</strong> mean the services offered to you in
              the Platform.
            </p>
            <p>
              <strong>Supplier</strong> means the person, firm or company who
              provides Services to the Company's Clients.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">1. THE AGREEMENT</h2>
          <p>
            1.1 These Terms and Conditions (including Annex A) apply to all
            Services booked through the Platform and contain the whole agreement
            between the Company and the Client.
          </p>
          <p>
            2.2 No variations to the Terms and Conditions shall be binding
            unless agreed in writing and signed by both parties.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">2. LOG IN AND SERVICES</h2>
          <p>
            2.1 We will provide you with personalised log in details to access
            the Platform.
          </p>
          <p>
            2.2 The Platform contains the Services (as contained in Annex A)
            offered to you in accordance with your Concierge Package (see Clause
            3 below). Once you have decided on the Services that you want, you
            will be able to book, amend and pay for them within the Platform.
          </p>
          <p>
            2.3 Annex A contains additional information and conditions in
            respect of the Services. All Services within the Platform must be
            booked more than 7 days before your arrival date.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">3. CONCIERGE PACKAGES</h2>
          <div className="flex flex-col gap-5">
            <p>3.1 Gold Concierge Package. Includes:</p>
            <ul className="flex flex-col gap-3 ml-5">
              <li>Car rentals</li>
              <li>Transfers and drivers on call</li>
              <li>Private chefs, waiters and butlers</li>
              <li>Boat charters</li>
              <li>Food and drinks delivery (pre-arrival)</li>
            </ul>
            <p className="font-semibold">Pricing:</p>
            <ul>
              <li>Complementary for our partners' clients</li>
              <li>€ 600 (including 21% VAT) - external clients</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <p>
              3.2 Platinum Concierge Package. Includes all services covered in
              the Gold Concierge Package with the addition of:
            </p>
            <ul className="flex flex-col gap-3 ml-5">
              <li>Introductory video call</li>
              <li>Personalised itinerary design and management</li>
              <li>Access to local guides</li>
              <li>Concierge visit on arrival</li>
              <li>
                Daily concierge telephone assistance throughout your stay (10am
                to 7pm)
              </li>
              <li>Villa and personal security</li>
              <li>Wellness, fitness, spa and beauty bookings</li>
              <li>Childcare bookings</li>
              <li>
                Restaurant, beach club and VIP nightclub bookings*{' '}
                <p className="italic">
                  (*Limited to 1 modification per booking. Fees apply for
                  additional changes)
                </p>
              </li>
            </ul>
            <p className="font-semibold">Pricing:</p>
            <p>€ 1,200 per week (including 21% VAT)</p>
            <p>
              The minimum spend is €15,000 per week (including 21% VAT). If the
              spend is lower, a flat fee of €1,800 per week (including 21% VAT)
              applies.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">4. SUPPLIERS</h2>
          <p>
            4.1 The Company will carry out reasonable enquiries to ensure that
            all Suppliers are qualified, insured, and competent to carry out the
            services required to a proper standard. However, the Company shall
            not be held responsible or liable for products and services sold by
            any Supplier.
          </p>
          <p>
            4.2 When you contract local services directly with the Supplier your
            contract will be with them, therefore we will not be liable for any
            complaints, claims, losses or damages in relation to such services.
          </p>
          <p>
            4.3 In the cases that the Company engages a Supplier on your behalf,
            it does so as an introductory agent. We will endeavour to provide
            you with Supplier terms & conditions, if requested, and where
            available but we are not liable if we cannot provide them to you.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">5. PAYMENTS</h2>
          <p>
            Payments will be made by credit card on the Platform. All payments
            are subject to a processing fee. If a refund is issued, the
            processing fee is non-refundable.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">
            6. CANCELLATION/AMENDMENT POLICY
          </h2>
          <p>
            Cancellation/amendment policies vary for different Services. Please
            refer to Annex A for specific information regarding specific
            cancellation policies for each Service.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">
            7. CLIENT'S RESPONSIBILITIES
          </h2>
          <p>
            7.1 You shall cooperate with us, provide any information and comply
            with all requirements which are requested by us and that may be
            reasonably necessary to enable us or a Supplier to perform the
            Services.
          </p>
          <p>
            7.2 You will be responsible for obtaining any consents, licenses and
            permissions, necessary for Services to be provided and supply them
            to us and/or to the relevant Supplier.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">8. LIMITATION OF LIABILITY</h2>
          <p>
            8.1 We shall not be held liable for any loss, cost, damage,
            including but not limited to personal injury, death, or expense
            howsoever caused resulting from the provision of the Services or
            arising from requests or instructions supplied by you, or Services
            supplied by the Supplier.
          </p>
          <p>
            8.2 Except as required by law, we do not give any guarantee,
            warranty or representation as to the quality, fitness for purpose or
            otherwise of Services supplied by us or services or goods supplied
            by Suppliers.
          </p>
          <p>
            8.3 In relation to any loss, cost, or damage including, but not
            limited to, personal injury, death or expenses, you agree not to
            seek any compensation from us and you may seek compensation from
            Suppliers directly.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">9. DATA PROTECTION</h2>
          <p>We comply with the Data Protection and Privacy laws of Spain.</p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">10. FORCE MAJEURE</h2>
          <p>
            We shall have no liability to you if we are prevented from, or are
            delayed in performing, our obligations under the Agreement or from
            carrying on our business by acts, events, omissions or accidents
            beyond our reasonable control, including (without limitation)
            strikes, lock-outs or other industrial disputes, failure of a
            utility service or transport network, an act of God, pandemic, an
            act of terrorism, war, riot, civil commotion, malicious damage,
            compliance with any law of governmental order, rule, regulation or
            direction, accident, breakdown of plant of machinery, fire, flood,
            storm or default of suppliers or subcontractors.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">11. SEVERANCE</h2>
          <p>
            If a provision (or part provision) of the Terms and Conditions is
            found by any court or other authority of competent jurisdiction to
            be illegal, invalid or unenforceable, the provision (or part
            provision) shall apply with the minimum modification necessary to
            make it legal, valid and enforceable, and the validity and
            enforceability of the other provisions (or part provisions) of the
            Agreement t shall not be affected.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">
            12. ENTIRE AGREEMENT AND DISPUTES
          </h2>
          <p>
            These Terms and Conditions, contain the entire agreement between the
            parties and may not be varied, save as agreed in writing between the
            parties.
          </p>
          <p>
            Any dispute or claim arising out of or in connection with these
            Terms and Conditions, or its subject matter shall be governed by and
            construed in accordance with the laws of the Spanish Court in Ibiza.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">IN RESORT TRANSFERS</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                Drivers will wait a maximum of 15 minutes after the scheduled
                pick-up time (except for airport arrivals). After this, the
                driver will leave, and the transfer will not be refunded.
              </p>
            </li>
            <li>
              <p>
                Transfers can be cancelled, changed and refunded up to 48 hours
                before the schedule time for the service.
              </p>
            </li>
            <li>
              <p>No-shows or late cancellations incur a 100% charge.</p>
            </li>
            <li>
              <p>
                Transfers are A to B - deviations and additional stops are not
                included.
              </p>
            </li>
            <li>
              <p>
                Payments to be made by credit card on the Platform at the time
                of booking
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">DRIVERS ON CALL</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                Drivers can be cancelled, changed and refunded up to 48 hours
                before the schedule time for the service.
              </p>
            </li>
            <li>
              <p>No-shows or late cancellations incur a 100% charge.</p>
            </li>
            <li>
              <p>
                Payments to be made by credit card on the Platform at the time
                of booking.
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">CHEFS & ASSISTANTS</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                Weekly services: Fully refundable if cancelled more than 30 days
                before the service start date. 50% refund if cancelled 8-29 days
                before. Cancellations within 7 days are non-refundable.
              </p>
            </li>
            <li>
              <p>
                Single services: Fully refundable if cancelled more than 15 days
                before the service. 50% refund if cancelled 8-14 days before.
                Cancellations within 7 days are non-refundable. Changes can only
                be made up to 7 days before.
              </p>
            </li>
            <li>
              <p>
                For single services you will need to grant the chef access to
                the villa 2 hours before the start of the service. Chefs will
                wait a maximum of 30 minutes. If you have not arrived, the chef
                will leave, and the service will not be refunded.
              </p>
            </li>
            <li>
              <p>
                Payments will be made by credit card on the Platform at the time
                of booking.
              </p>
            </li>
            <li>
              <p>Food costs must be paid directly to the chef in resort.</p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">BOAT CHARTERS</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                A 50% deposit is required to book and is fully refundable if
                cancelled more than 30 days before the charter date.
              </p>
            </li>
            <li>
              <p>
                The remaining balance (100%) is due 30 days before the charter.
              </p>
            </li>
            <li>
              <p>
                Cancellations between 15-29 days before the charter will receive
                a 75% refund of the total amount.
              </p>
            </li>
            <li>
              <p>
                Cancellations within 15 days of the charter are non-refundable.
              </p>
            </li>
            <li>
              <p>
                In some cases, the charter date may be changed, subject to
                availability.
              </p>
            </li>
            <li>
              <p>
                If the charter is cancelled due to adverse weather, a full
                refund or the option to reschedule will be offered.
              </p>
            </li>
            <li>
              <p>
                Payments to be made by credit card on the Platform at the time
                of booking
              </p>
            </li>
            <li>
              <p>
                Fuel costs must be paid directly to the charter company on the
                day of charter.
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">DRINKS DELIVERY</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>Orders must be placed at least 7 days before check-in.</p>
            </li>
            <li>
              <p>
                Orders can be cancelled and refunded up to 7 days before
                delivery.
              </p>
            </li>
            <li>
              <p>No returns or refunds for unused products.</p>
            </li>
            <li>
              <p>
                Payments to be made by credit card on the Platform at the time
                of booking.
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">FOOD DELIVERY</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                Orders must be placed at least 7 days before check-in to ensure
                timely delivery.
              </p>
            </li>
            <li>
              <p>Payment is made directly to the Supplier via credit card.</p>
            </li>
            <li>
              <p>
                Refer to the Supplier's terms and conditions for cancellations
                and other details.
              </p>
            </li>
            <li>
              <p>
                Magnetic Travel is not responsible for missing or incorrect
                items.
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">WELLNESS, SPA & BEAUTY</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                Bookings cancelled more than 48 hours before the service are
                fully refundable.
              </p>
            </li>
            <li>
              <p>Cancellations within 48 hours are non-refundable.</p>
            </li>
            <li>
              <p>
                Time and date changes may be available within 48 hours, subject
                to availability.
              </p>
            </li>
            <li>
              <p>
                Payments to be made by credit card on the Platform at the time
                of booking
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">SECURITY</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                Bookings cancelled more than 30 days before the service date are
                fully refundable.
              </p>
            </li>
            <li>
              <p>
                Cancellations 15-29 days before the service will receive a 50%
                refund.
              </p>
            </li>
            <li>
              <p>
                Cancellations within 14 days of the service are non-refundable.
              </p>
            </li>
            <li>
              <p>
                Payments to be made by credit card on the Platform at the time
                of booking
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">CHILDCARE</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                Bookings cancelled more than 7 days before the service date are
                fully refundable.
              </p>
            </li>
            <li>
              <p>
                Cancellations within 7 days of the service are non-refundable.
              </p>
            </li>
            <li>
              <p>
                Time/date changes may be available up to 7 days subject to
                availability.
              </p>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">RESERVATIONS</h2>
          <ul className="flex flex-col gap-3 list-disc pl-10">
            <li>
              <p>
                To make a reservation, you'll need to provide the necessary
                details, including credit card information or deposit payments
                if required by the venue.
              </p>
            </li>
            <li>
              <p>
                Each establishment has its own cancellation policy, which will
                be provided for each booking. It's your responsibility to cancel
                within the specified time to avoid charges.
              </p>
            </li>
          </ul>
        </section>
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-bold  text-center">
          CONDICIONES GENERALES DE CONTRATACIÓN
        </h1>
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <p className="font-semibold">Introducción</p>
            <p>
              Este documento contractual regirá las Condiciones Generales de
              contratación de servicios (en adelante, «Condiciones») a través
              del sitio web magnetic-travel.com, propiedad de MAGNETIC JOURNEYS
              SL bajo la marca comercial de MAGNETIC JOURNEYS, en adelante,
              PRESTADOR, cuyos datos de contacto figuran también en el Aviso
              Legal de esta Web.
            </p>
            <p>
              Estas Condiciones permanecerán publicadas en el sitio web a
              disposición del USUARIO para reproducirlas y guardarlas como
              confirmación del contrato, pudiendo ser modificadas en cualquier
              momento por el PRESTADOR. Es responsabilidad del USUARIO leerlas
              periódicamente, ya que resultarán aplicables aquellas que se
              encuentren vigentes en el momento de realización de pedidos.
            </p>
            <p>
              Los contratos no estarán sujetos a formalidad alguna con excepción
              de los supuestos expresamente señalados en los Códigos Civil y de
              Comercio y en esta o en otras leyes especiales.
            </p>
            <p>La aceptación de este documento conlleva que el USUARIO:</p>
            <ul className="flex flex-col gap-3 list-disc pl-10">
              <li>
                <p>Ha leído, entiende y comprende lo aquí expuesto.</p>
              </li>
              <li>
                <p>Es una persona con capacidad suficiente para contratar.</p>
              </li>
              <li>
                <p>Asume todas las obligaciones aquí dispuestas.</p>
              </li>
            </ul>
            <p>
              Estas condiciones tendrán un período de validez indefinido y serán
              aplicables a todas las contrataciones realizadas a través del
              sitio web del PRESTADOR.
            </p>
            <p>
              El PRESTADOR informa de que el comercio es responsable y conoce la
              legislación vigente, y se reserva el derecho de modificar
              unilateralmente las condiciones, sin que ello pueda afectar a los
              términos y condiciones que fueron implementados previamente a la
              modificación.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-semibold">
              Identidad de las partes contratantes
            </p>
            <p>
              Por un lado, el PRESTADOR de los servicios contratados por el
              USUARIO es MAGNETIC JOURNEYS SL, con domicilio social en Calle
              Pere Escanellas, Nº24, Planta 1, 4, 07830 San Jose (ILLES
              BALEARS), NIF B57847675 y con teléfono de atención al
              cliente/USUARIO 647 940 458.
            </p>
            <p>
              Y de otro, el USUARIO, registrado en el sitio web con un nombre de
              usuario y contraseña proporcionados por el PRESTADOR, sobre los
              que tiene responsabilidad plena de uso y custodia, y es
              responsable de la veracidad de los datos personales facilitados al
              PRESTADOR.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-semibold">Objeto del contrato</p>
            <p>
              El presente contrato tiene por objeto regular la relación
              contractual de compraventa nacida entre el
            </p>
            <p>
              PRESTADOR y el USUARIO en el momento en que este acepta durante el
              proceso de contratación en línea la casilla correspondiente.
            </p>
            <p>
              La relación contractual de compraventa conlleva la entrega, a
              cambio de un precio determinado y públicamente expuesto a través
              del sitio web, de un servicio contratado.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-semibold">Rectificación de los datos</p>
            <p>
              Cuando el USUARIO identifique errores en los datos publicados en
              el sitio web o en los documentos generados por la relación
              contractual, podrá notificarlo al correo info@magnetic-travel.com
              para que MAGNETIC JOURNEYS SL los corrija a la mayor brevedad
              posible.
            </p>
            <p>
              El USUARIO podrá mantener actualizados sus datos accediendo a su
              cuenta de usuario.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-semibold">Procedimiento de contratación</p>
            <p>
              El USUARIO, para poder acceder a los servicios que ofrece el
              PRESTADOR, deberá ser mayor de edad y recibirá una cuenta de
              usuario creada por el PRESTADOR. Por ello, el USUARIO deberá
              proporcionar de manera libre y voluntaria los datos personales que
              se le requerirán, los cuales se tratarán de conformidad con lo
              dispuesto en el Reglamento (UE) 2016/679, de 27 de abril de 2016
              (GDPR), relativo a la protección de las personas físicas en lo que
              respecta al tratamiento de datos personales y a la libre
              circulación de estos datos y la Ley Orgánica 3/2018, de 5 de
              diciembre (LOPDGDD), relativa a la protección de datos de carácter
              personal y detallada en el Aviso legal y en la Política de
              privacidad de este sitio web.
            </p>
            <p>
              Una vez ha sido creada la cuenta de usuario, se informa de que
              conforme a lo que exige el artículo 27 de la Ley 34/2002, de
              Servicios de la Sociedad de la Información y del Comercio
              Electrónico (LSSICE), el procedimiento de contratación seguirá los
              siguientes pasos:
            </p>
            <ul className="flex flex-col gap-3 list-decimal ml-10">
              <li> Cláusulas generales de contratación.</li>
              <li> Activación de servicios.</li>
              <li> Derecho de desistimiento.</li>
              <li> Reclamaciones y resolución de litigios en línea.</li>
              <li> Fuerza mayor.</li>
              <li> Competencia.</li>
              <li> Generalidades de la oferta.</li>
              <li> Precio y plazo de validez de la oferta.</li>
              <li> Gastos de transporte.</li>
              <li> Forma de pago, gastos y descuentos.</li>
              <li> Proceso de compra.</li>
              <li> Disociación y suspensión o rescisión del contrato.</li>
              <li> Garantías y devoluciones.</li>
              <li> Ley aplicable y jurisdicción.</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">
            1. CLÁUSULAS GENERALES DE CONTRATACIÓN
          </h2>
          <p>
            Salvo estipulación particular por escrito, la realización de un
            pedido al PRESTADOR supondrá la aceptación por parte del USUARIO de
            estas condiciones legales. Ninguna estipulación hecha por el USUARIO
            podrá diferir de las del PRESTADOR si no ha sido expresamente
            aceptada por adelantado y por escrito por el PRESTADOR.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">2. ACTIVACIÓN DE SERVICIOS</h2>
          <p>
            El PRESTADOR no activará ningún servicio hasta que haya comprobado
            que se ha realizado el pago.
          </p>
          <p>
            Algunos pedidos pueden incluir la entrega de un producto físico,
            mientras que otros corresponden a la prestación de un servicio en la
            fecha acordada. El PRESTADOR informará previamente al USUARIO sobre
            el procedimiento correspondiente.
          </p>
          <p className="font-semibold">
            Falta de ejecución del contrato a distancia
          </p>
          <p>
            En el caso de la prestación de un servicio, este será prestado en la
            fecha y lugar acordados una vez que el USUARIO haya efectuado el
            pago.
          </p>
          <p>
            En caso de que la contratación no conlleve la entrega física de
            ningún producto, sino la entrega de un producto físico o la
            prestación del servicio contratado, el PRESTADOR informará
            previamente al USUARIO sobre el procedimiento a seguir.
          </p>
          <p>
            En caso de no poder ejecutar el contrato porque el servicio
            contratado no esté disponible en el plazo previsto, se informará al
            USUARIO de la falta de disponibilidad y de que quedará legitimado
            para cancelar el pedido y recibir la devolución del importe total
            pagado sin ningún coste, y sin que por ello se derive ninguna
            responsabilidad por daños y perjuicios imputable al PRESTADOR.
          </p>
          <p>
            En caso de retraso injustificado por parte del PRESTADOR respecto a
            la devolución del importe total, el USUARIO podrá reclamar que se le
            pague el doble del importe adeudado, sin perjuicio a su derecho de
            ser indemnizado por los daños y perjuicios sufridos en lo que
            excedan de dicha cantidad.
          </p>
          <p>
            El PRESTADOR no asumirá ninguna responsabilidad cuando la descarga o
            activación del servicio no llegue a realizarse, por ser los datos
            facilitados por el USUARIO falsos, inexactos o incompletos.
          </p>
          <p>
            La prestación del servicio se considerará realizada en el momento en
            que el USUARIO haya descargado o activado el servicio.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">3. DERECHO DE DESISTIMIENTO</h2>
          <div>
            <p>Formulario de desistimiento:</p>
            <a href="https://www.magnetic-travel.com/wp-content/uploads/2025/03/formulario-solicitud-desistimiento.pdf">
              https://www.magnetic-travel.com/wp-content/uploads/2025/03/formulario-solicitud-desistimiento.pdf
            </a>
          </div>
          <p>
            El USUARIO dispone de un plazo de catorce días naturales, contados a
            partir de la fecha de recepción del producto o desde la celebración
            del contrato de compraventa si fuera una prestación de un servicio,
            para ejercer el derecho de desistimiento, regulado en el{' '}
            <a
              href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&b=156&tn=1&p=20140328#a102"
              target="_blank"
              className="underline"
            >
              artículo 102 del Real Decreto Legislativo 1/2007
            </a>
            , de 16 de noviembre, por el que se aprueba el texto refundido de la
            Ley General para la Defensa de los Consumidores y Usuarios y otras
            leyes complementarias, en adelante RDL 1/2007. Si el PRESTADOR no
            cumple con el deber de información y documentación sobre el derecho
            de desistimiento, el plazo para su ejercicio finalizará doce meses
            después de la fecha de expiración del período de desistimiento
            inicial, conforme al{' '}
            <a
              href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20140328&tn=1#a105"
              target="_blank"
              className="underline"
            >
              artículo 105 del RDL 1/2007.
            </a>
          </p>
          <p>
            El derecho de desistimiento no será aplicable a los contratos
            referidos y enumerados en{' '}
            <a
              href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20140328&tn=1#a103"
              target="_blank"
              className="underline"
            >
              el artículo 103 del RDL 1/2007
            </a>
            , y que se relacionan{' '}
            <a
              href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20211103&tn=1#tiv-3"
              target="_blank"
              className="underline"
            >
              aquí
            </a>{' '}
            .
          </p>
          <p>
            Toda solicitud de devolución deberá comunicarse al PRESTADOR,
            solicitando un número de devolución a través del formulario
            disponible o por correo electrónico a info@magnetic-travel.com,
            indicando el número de factura o referencia del pedido.
          </p>
          <p>
            Las devoluciones se gestionarán exclusivamente mediante el reembolso
            del importe pagado por el servicio, excluyendo cualquier comisión
            bancaria o de procesamiento aplicada en la transacción. No se
            aceptan devoluciones físicas de productos.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">
            4. RECLAMACIONES Y RESOLUCIÓN DE LITIGIOS EN LÍNEA
          </h2>
          <p>
            Cualquier reclamación que el USUARIO considere oportuna será
            atendida a la mayor brevedad posible, pudiéndose realizar en las
            siguientes direcciones de contacto:
          </p>
          <div>
            <p>
              Postal: MAGNETIC JOURNEYS SL, Calle Pere Escanellas, Nº24, Planta
              1, 4 , 07830 San Jose (ILLES BALEARS)
            </p>
            <p>Teléfono: 647 940 458</p>
            <p>E-mail: info@magnetic-travel.com</p>
          </div>
          <p>
            El derecho de desistimiento no será aplicable a los contratos
            referidos y enumerados en el artículo 103 del RDL 1/2007, y que se
            relacionan aquí.
          </p>
          <p className="font-semibold">
            Resolución de litigios en línea (Online Dispute Resolution)
          </p>
          <p>
            Conforme al Art. 14.1 del Reglamento (UE) 524/2013, la Comisión
            Europea facilita una plataforma de acceso gratuito para la
            resolución de conflictos online entre el USUARIO y el PRESTADOR, sin
            necesidad de recurrir a los tribunales de justicia, mediante la
            intervención de un tercero, llamado Organismo de resolución de
            litigios, que actúa de intermediario entre ambos. Este organismo es
            neutral y dialogará con ambas partes para lograr un acuerdo,
            pudiendo finalmente sugerir y/o imponer una solución al conflicto.
          </p>
          <p>
            Enlace a la plataforma ODR:{' '}
            <a href="http://ec.europa.eu/consumers/odr/" target="_blank">
              http://ec.europa.eu/consumers/odr/
            </a>
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">5. FUERZA MAYOR</h2>
          <p>
            Las partes no incurrirán en responsabilidad ante cualquier falta
            debida a causa mayor. El cumplimiento de la obligación se demorará
            hasta el cese del caso de fuerza mayor.
          </p>
          <p>
            Si debido a restricciones gubernamentales, desastres naturales u
            otras circunstancias de fuerza mayor el USUARIO no puede recibir el
            servicio, se le devolverá íntegramente la cantidad pagada o tendrá
            la posibilidad de utilizar su reserva en una nueva fecha propuesta
            por el PRESTADOR.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">6. COMPETENCIA</h2>
          <p>
            El USUARIO no podrá ceder, transferir o transmitir los derechos,
            responsabilidades y obligaciones contratados en la venta.
          </p>
          <p>
            Si alguna estipulación de estas condiciones fuera considerada nula o
            de imposible cumplimiento, la validez, legalidad y cumplimiento del
            resto no se verán afectados de ninguna manera, ni sufrirán
            modificación de ningún modo.
          </p>
          <p>
            El USUARIO declara haber leído, conocer y aceptar las presentes
            Condiciones en toda su extensión.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">
            7. GENERALIDADES DE LA OFERTA
          </h2>
          <p>
            Todas las ventas efectuadas por el PRESTADOR se entenderán sometidas
            a las presentes Condiciones.
          </p>
          <p>
            Ninguna modificación, alteración o pacto contrario a la Propuesta
            Comercial de MAGNETIC JOURNEYS SL o a lo aquí estipulado, tendrá
            efecto, salvo pacto expreso por escrito firmado por el PRESTADOR, en
            este caso, estos pactos particulares prevalecerán.
          </p>
          <p>
            Dados los continuos avances técnicos y mejoras de los servicios, el
            PRESTADOR se reserva la facultad de modificar sus especificaciones
            respecto de la información facilitada en su publicidad, hasta que no
            afecte el valor de los servicios ofrecidos. Estas modificaciones
            tendrán asimismo validez en caso de que, por cualquier causa, se
            viera afectada la posibilidad de suministro de los servicios
            ofrecidos.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">
            8. PRECIO Y PLAZO DE VALIDEZ DE LA OFERTA
          </h2>
          <p>
            Los precios indicados para cada servicio incluyen el Impuesto sobre
            el Valor Añadido (IVA) y otros impuestos aplicables. Estos precios,
            a menos que se indique expresamente lo contrario, no incluyen los
            gastos de envío o comunicación, manipulación, envoltorio, seguro de
            envíos o cualesquiera otros servicios adicionales y anexos al
            servicio adquirido.
          </p>
          <p>
            Los precios aplicables a cada servicio son los publicados en el
            sitio web y se expresarán en la moneda EURO. El USUARIO asume que la
            valoración económica de algunos de los servicios podrá variar en
            tiempo real.
          </p>
          <p>
            Antes de realizar la compra podrá comprobar en línea todos los
            detalles del presupuesto: servicios, cantidades, precio,
            disponibilidad, cargos, descuentos, impuestos y el total de la
            compra. Los precios pueden cambiar diariamente mientras no se
            realice el pedido.
          </p>
          <p>
            Una vez confirmado el pedido, el precio se mantendrá sin cambios.
          </p>
          <p>
            Todo pago realizado al PRESTADOR conlleva la emisión de una factura
            a nombre del USUARIO registrado o de la razón social que este haya
            informado en el momento de realizar el pedido. La factura se enviará
            en formato PDF a la dirección de correo electrónico proporcionada
            por el USUARIO, siempre y cuando haya dado su consentimiento expreso
            para ello, informándole de que podrá revocar dicho consentimiento en
            cualquier momento comunicándose al PRESTADOR por cualquiera de los
            medios puestos a su disposición.
          </p>
          <p>
            Para cualquier información sobre el pedido, el USUARIO podrá
            contactar a través del teléfono de atención al cliente del PRESTADOR
            647 940 458 o vía correo electrónico a la dirección
            info@magnetic-travel.com.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">9. GASTOS DE TRANSPORTE</h2>
          <p>No existen gastos de transporte.</p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">
            10. FORMAS DE PAGO, CARGOS Y DESCUENTOS
          </h2>
          <p>No existen gastos de transporte.</p>
          <p>
            El PRESTADOR es el responsable de las transacciones económicas y
            posibilita las siguientes formas para efectuar el pago de un pedido:
          </p>
          <p>Tarjeta de crédito</p>
          <p className="font-semibold">Medidas de seguridad</p>
          <p>
            El sitio web utiliza técnicas de seguridad de la información
            generalmente aceptadas en la industria, tales como SSL, datos
            introducidos en página segura, firewalls, procedimientos de control
            de acceso y mecanismos criptográficos, todo ello con el objeto de
            evitar el acceso no autorizado a los datos. Para lograr estos fines,
            el USUARIO acepta que el PRESTADOR obtenga datos para efecto de la
            correspondiente autenticación de los controles de acceso.
          </p>
          <p>
            El PRESTADOR se compromete a no permitir ninguna transacción que sea
            o sea considerada ilegal por las marcas de tarjetas de crédito o el
            banco adquiriente, que pueda o tenga el potencial de dañar la buena
            voluntad de los mismos o influir de manera negativa en ellos.
          </p>
          <p>
            Las siguientes actividades están prohibidas en virtud de los
            programas de las marcas de tarjetas: la venta u oferta de un
            producto o servicio que no cumpla con todas las leyes aplicables al
            Comprador, Banco Emisor, Comerciante o Titular de la tarjeta o
            tarjetas.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">11. PROCESO DE COMPRA</h2>
          <p className="font-semibold">Cesta (simulación de presupuesto)</p>
          <p>
            Cualquier servicio de nuestro catálogo se puede añadir a la cesta.
            En esta, solo se observarán los servicios seleccionados, la
            cantidad, el precio y el importe total. Una vez guardada la cesta se
            procederá a calcular los impuestos, cargos y descuentos según los
            datos introducidos.
          </p>
          <p>
            Las cestas no tienen ninguna vinculación administrativa, solo es un
            apartado donde se puede simular un presupuesto sin ningún compromiso
            por ambas partes.
          </p>
          <p>
            Desde la cesta se puede hacer un pedido siguiendo los pasos
            siguientes para su correcta formalización:
          </p>
          <ul className="flex flex-col gap-3 list-decimal ml-10">
            <li>Comprobación de los datos de facturación.</li>
            <li>Confirmación del tipo de servicio y detalles de la reserva.</li>
            <li>
              Selección del método de pago y aplicación de cargos
              correspondientes.
            </li>
            <li>Finalización del pedido (comprar).</li>
          </ul>
          <p>
            Una vez procesado el pedido, el sistema envía instantáneamente un
            correo electrónico al departamento de gestión del PRESTADOR y otro
            al correo del USUARIO confirmando la realización del pedido.
          </p>
          <p className="font-semibold">Pedidos (solicitudes de compra)</p>
          <p>
            El USUARIO recibirá un correo electrónico confirmando los detalles
            de su reserva y la fecha del servicio contratado.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">
            12. DISOCIACIÓN Y SUSPENSIÓN O RESCISIÓN DEL CONTRATO
          </h2>
          <p>
            Si cualquiera de estos términos y condiciones se considerara ilegal,
            nula o por cualquier razón inaplicable, esta condición se
            considerará separable y no afectará la validez y aplicabilidad de
            ninguna de las condiciones restantes.
          </p>
          <p>
            MAGNETIC JOURNEYS podrá, sin previo aviso, suspender o terminar el
            acceso del USUARIO a sus servicios, en su totalidad o en parte, por
            cualquier razón válida, incluyendo, sin limitaciones, cuando el
            USUARIO no cumpla o siga cualquiera de las obligaciones establecidas
            en este documento o cualquier disposición legal, licencia,
            reglamento, directiva, código de prácticas o políticas de uso
            aplicables.
          </p>
          <p>
            Cuando MAGNETIC JOURNEYS ejerza cualquiera de sus derechos o
            facultades bajo esta Cláusula, tal ejercicio no perjudicará ni
            afectará el ejercicio de cualquier otro derecho, facultad o recurso
            que pueda estar a disposición de MAGNETIC JOURNEYS.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">13. GARANTÍAS Y DEVOLUCIONES</h2>
          <p>
            Las garantías responderán a lo regulado en el Título referido a
            "Garantías y servicios posventa" del Real Decreto Legislativo
            1/2007, de 16 de noviembre, por el que se aprueba el texto refundido
            de la Ley General para la Defensa de los Consumidores y Usuarios y
            otras leyes complementarias, al que puede acceder clicando aquí.
          </p>
          <p>
            Para los servicios prestados por el PRESTADOR, no se aplica una
            garantía en los términos tradicionales de productos físicos.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-l font-semibold">
            14. LEY APLICABLE Y JURISDICCIÓN
          </h2>
          <p>
            Estas condiciones se regirán o interpretarán conforme a la
            legislación española en aquello que no esté expresamente
            establecido. Cualquier controversia que pudiera suscitarse de la
            prestación de los productos o servicios objeto de estas Condiciones
            se someterá a los juzgados y tribunales del domicilio del USUARIO,
            al lugar del cumplimiento de la obligación o aquel en que se
            encuentre el bien si éste fuera inmueble.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsConditionsPage;
