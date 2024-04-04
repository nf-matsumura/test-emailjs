'use client'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser';

type FormValues = {
  name: string
  email: string
  message: string
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });
  const form_id = import.meta.env.PUBLIC_FORM_ID;
  const template_id = import.meta.env.PUBLIC_TEMPLATE_ID;
  const form_pub_id = import.meta.env.PUBLIC_FORM_PUB_KEY;
  

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();

    await emailjs.sendForm(form_id, template_id, '#myForm', {
      "publicKey": form_pub_id
    }).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );
  })

  return (
    <>
      <h1>Contact us</h1>
      <form onSubmit={onSubmit} id='myForm'>
        <div>
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
            aria-describedby="error-name-required"
          />
          {errors?.name && (
            <span id="error-name-required" aria-live="assertive">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email')} />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" {...register('message')}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default ContactForm;