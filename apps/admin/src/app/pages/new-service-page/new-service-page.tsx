import ServiceForm from '../../components/form-services';

export function NewServiceForm() {
  return (
    <div className="new-booking-page">
      <h1 className="mb-8">New Service</h1>
      <ServiceForm />
    </div>
  );
}

export default NewServiceForm;
