import logo from './logo.svg';
import './App.css';
import { Form, TextInput, Button, Header, GovBanner, Label, Fieldset, ErrorMessage, Alert } from '@trussworks/react-uswds';
import { SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';
import { Input, TelInput } from './FormHelpers';
import { useState } from 'react';

// Note, if we share a backend in Typescript, we can reuse these typings there.
export interface SignupOptions {
  'full_name': string,
  'pet_name': string,
  'pet_id': string,
  'phone': string,
}

interface AlertMsg {
  success: boolean,
  text: string,
}

function App() {
  const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm<SignupOptions>();
  const [alertMsg, setAlertMsg] = useState<AlertMsg>();

  const onSubmit: SubmitHandler<SignupOptions> = async (data) => {

    try {
      const ret = await axios({
        method: 'POST',
        // This should be changed based on deployment.
        baseURL: 'http://localhost:5000/',
        url: '/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      });
      console.log(ret);

      setAlertMsg({
        success: ret.data?.success ?? false,
        text: ret.data?.text ?? 'An unknown error has occurred.'
      });
      return ret.data?.success === true;
    } catch (e) {
      console.error(e);
      setAlertMsg({
        success: false,
        text: 'An unknown error has occurred.'
      });
      return false;
    }
  }

  return (<>
    <GovBanner></GovBanner>
    <Header>
      <div className='header-div'>
        <img src={logo} alt='logo' height={'100rem'} /><h1 className='header-text'>Department for the Protection of Pets</h1>
      </div>
    </Header>
    <div className='form-div'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {alertMsg?.text && <Alert type={alertMsg?.success ? 'success' : 'error'}>{alertMsg?.text}</Alert>}
        <Fieldset legend='Sign Up for Rescue Alerts!' legendStyle='large'>
          <Input name='full_name' label='Full Name' register={register} required={true} type={'text'} />
          {errors.full_name && <ErrorMessage>This field is required</ErrorMessage>}
          <Input name='pet_name' label='Pet Name' register={register} required={true} type={'text'} />
          {errors.pet_name && <ErrorMessage>This field is required</ErrorMessage>}
          <Input name='pet_id' label='Pet ID' register={register} required={true} type={'text'} />
          {errors.pet_id && <ErrorMessage>This field is required</ErrorMessage>}
          <TelInput name='phone' label='Phone' register={register} required={true} type={'tel'} />
          {errors.phone?.type === 'required' && <ErrorMessage>This field is required</ErrorMessage>}
          {errors.phone?.type === 'pattern' && <ErrorMessage>Please enter a valid phone number</ErrorMessage>}
          <Button type='submit' className='form-submit-btn'>Submit</Button>
        </Fieldset>
      </Form>
    </div>
  </>
  );
}

export default App;
