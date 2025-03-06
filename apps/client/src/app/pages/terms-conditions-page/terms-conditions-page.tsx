import React from 'react';

interface Props {}

function TermsConditionsPage(props: Props) {
  const {} = props;

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-10 py-10">
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
          becomes a customer of the Company through booking any of the services
          offered in the Platform by it and is responsible and liable for the
          payment of the Services.
        </p>
        <p>
          <strong>The Platform</strong> means an online booking platform created
          by the Company so Clients can book concierge services independently.
        </p>
        <div>
          <p>
            <strong>Service(s)</strong> mean the services offered to you in the
            Platform.
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
          2.2 No variations to the Terms and Conditions shall be binding unless
          agreed in writing and signed by both parties.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">2. LOG IN AND SERVICES</h2>
        <p>
          2.1 We will provide you with personalised log in details to access the
          Platform.
        </p>
        <p>
          2.2 The Platform contains the Services (as contained in Annex A)
          offered to you in accordance with your Concierge Package (see Clause 3
          below). Once you have decided on the Services that you want, you will
          be able to book, amend and pay for them within the Platform.
        </p>
        <p>
          2.3 Annex A contains additional information and conditions in respect
          of the Services. All Services within the Platform must be booked more
          than 7 days before your arrival date.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">3. CONCIERGE PACKAGES</h2>
        <div className="flex flex-col gap-5">
          <p>3.1 Gold Concierge Package. Includes:</p>
          <ul>
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
            3.2 Platinum Concierge Package. Includes all services covered in the
            Gold Concierge Package with the addition of:
          </p>
          <ul>
            <li>Introductory video call</li>
            <li>Personalised itinerary design and management</li>
            <li>Access to local guides</li>
            <li>Concierge visit on arrival</li>
            <li>
              Daily concierge telephone assistance throughout your stay (10am to
              7pm)
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
          4.1 The Company will carry out reasonable enquiries to ensure that all
          Suppliers are qualified, insured, and competent to carry out the
          services required to a proper standard. However, the Company shall not
          be held responsible or liable for products and services sold by any
          Supplier.
        </p>
        <p>
          4.2 When you contract local services directly with the Supplier your
          contract will be with them, therefore we will not be liable for any
          complaints, claims, losses or damages in relation to such services.
        </p>
        <p>
          4.3 In the cases that the Company engages a Supplier on your behalf,
          it does so as an introductory agent. We will endeavour to provide you
          with Supplier terms & conditions, if requested, and where available
          but we are not liable if we cannot provide them to you.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">5. PAYMENTS</h2>
        <p>
          Payments will be made by credit card on the Platform. All payments are
          subject to a processing fee. If a refund is issued, the processing fee
          is non-refundable.
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
        <h2 className="text-xl font-semibold">7. CLIENT'S RESPONSIBILITIES</h2>
        <p>
          7.1 You shall cooperate with us, provide any information and comply
          with all requirements which are requested by us and that may be
          reasonably necessary to enable us or a Supplier to perform the
          Services.
        </p>
        <p>
          7.2 You will be responsible for obtaining any consents, licenses and
          permissions, necessary for Services to be provided and supply them to
          us and/or to the relevant Supplier.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">8. LIMITATION OF LIABILITY</h2>
        <p>
          8.1 We shall not be held liable for any loss, cost, damage, including
          but not limited to personal injury, death, or expense howsoever caused
          resulting from the provision of the Services or arising from requests
          or instructions supplied by you, or Services supplied by the Supplier.
        </p>
        <p>
          8.2 Except as required by law, we do not give any guarantee, warranty
          or representation as to the quality, fitness for purpose or otherwise
          of Services supplied by us or services or goods supplied by Suppliers.
        </p>
        <p>
          8.3 In relation to any loss, cost, or damage including, but not
          limited to, personal injury, death or expenses, you agree not to seek
          any compensation from us and you may seek compensation from Suppliers
          directly.
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
          beyond our reasonable control, including (without limitation) strikes,
          lock-outs or other industrial disputes, failure of a utility service
          or transport network, an act of God, pandemic, an act of terrorism,
          war, riot, civil commotion, malicious damage, compliance with any law
          of governmental order, rule, regulation or direction, accident,
          breakdown of plant of machinery, fire, flood, storm or default of
          suppliers or subcontractors.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">11. SEVERANCE</h2>
        <p>
          If a provision (or part provision) of the Terms and Conditions is
          found by any court or other authority of competent jurisdiction to be
          illegal, invalid or unenforceable, the provision (or part provision)
          shall apply with the minimum modification necessary to make it legal,
          valid and enforceable, and the validity and enforceability of the
          other provisions (or part provisions) of the Agreement t shall not be
          affected.
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
          Any dispute or claim arising out of or in connection with these Terms
          and Conditions, or its subject matter shall be governed by and
          construed in accordance with the laws of the Spanish Court in Ibiza.
        </p>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">IN RESORT TRANSFERS</h2>
        <ul className="flex flex-col gap-3 list-disc pl-10">
          <li>
            <p>
              Drivers will wait a maximum of 15 minutes after the scheduled
              pick-up time (except for airport arrivals). After this, the driver
              will leave, and the transfer will not be refunded.
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
              Payments to be made by credit card on the Platform at the time of
              booking
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
              Payments to be made by credit card on the Platform at the time of
              booking.
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
              For single services you will need to grant the chef access to the
              villa 2 hours before the start of the service. Chefs will wait a
              maximum of 30 minutes. If you have not arrived, the chef will
              leave, and the service will not be refunded.
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
              Cancellations between 15-29 days before the charter will receive a
              75% refund of the total amount.
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
              If the charter is cancelled due to adverse weather, a full refund
              or the option to reschedule will be offered.
            </p>
          </li>
          <li>
            <p>
              Payments to be made by credit card on the Platform at the time of
              booking
            </p>
          </li>
          <li>
            <p>
              Fuel costs must be paid directly to the charter company on the day
              of charter.
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
              Orders can be cancelled and refunded up to 7 days before delivery.
            </p>
          </li>
          <li>
            <p>No returns or refunds for unused products.</p>
          </li>
          <li>
            <p>
              Payments to be made by credit card on the Platform at the time of
              booking.
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
              Refer to the Supplier's terms and conditions for cancellations and
              other details.
            </p>
          </li>
          <li>
            <p>
              Magnetic Travel is not responsible for missing or incorrect items.
            </p>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">WELLNESS, SPA & BEAUTY</h2>
        <ul className="flex flex-col gap-3 list-disc pl-10">
          <li>
            <p>
              Bookings cancelled more than 48 hours before the service are fully
              refundable.
            </p>
          </li>
          <li>
            <p>Cancellations within 48 hours are non-refundable.</p>
          </li>
          <li>
            <p>
              Time and date changes may be available within 48 hours, subject to
              availability.
            </p>
          </li>
          <li>
            <p>
              Payments to be made by credit card on the Platform at the time of
              booking
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
              Payments to be made by credit card on the Platform at the time of
              booking
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
              details, including credit card information or deposit payments if
              required by the venue.
            </p>
          </li>
          <li>
            <p>
              Each establishment has its own cancellation policy, which will be
              provided for each booking. It's your responsibility to cancel
              within the specified time to avoid charges.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default TermsConditionsPage;
