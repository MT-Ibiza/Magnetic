import { Button } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

function FormRequestCall() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      date: null,
      time: null,
      notes: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    alert('¡Llamada agendada exitosamente!');
  };

  const today = new Date().toISOString().split('T')[0];
  return (
    <div className="max-w-lg mx-auto rounded-lg p-3 bg-white">
      <h2 className="text-2xl font-bold mb-4">Schedule a call</h2>
      <p className="text-sm text-gray-500 mb-6">
        Complete the form to schedule a call with a magnetic team member.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Fullname"
            className="input input-bordered"
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="youremail@mail.com"
            className="input input-bordered"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="date" className="label">
            <span className="label-text">Fecha</span>
          </label>
          <input
            id="date"
            type="date"
            min={today}
            className="input input-bordered"
            {...register('date', { required: 'La fecha es obligatoria' })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="time" className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            id="time"
            type="time"
            className="input input-bordered"
            {...register('time', { required: 'Time is required' })}
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="notes" className="label">
            <span className="label-text">Notes (Optional)</span>
          </label>
          <textarea
            id="notes"
            placeholder="Adicional details"
            className="textarea textarea-bordered"
            {...register('notes')}
          />
        </div>
        <Button type="submit" className=" w-full">
          Schedule Call
        </Button>
      </form>
    </div>
  );
}

export default FormRequestCall;
